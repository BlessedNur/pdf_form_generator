"use client";
import React, { useRef, useState } from "react";
import PersonalInformationDisplay from "@/components/personal_tax_displays/PersonalInformationDisplay";
import IncomeDetailsDisplay from "@/components/personal_tax_displays/IncomeDetailsDisplay";
import BusinessIncomeDisplay from "@/components/personal_tax_displays/BusinessIncomeDisplay";
import RentalIncomeDisplay from "@/components/personal_tax_displays/RentalIncomeDisplay";
import SecondRentalIncomeDisplay from "@/components/personal_tax_displays/SecondRentalIncomeDisplay";
import DeclarationDisplay from "@/components/personal_tax_displays/DeclarationDisplay";
import { Check, NotepadText } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DividendIncomeDisplay from "./personal_tax_displays/DividendIncomeDisplay";
import InterestIncomeDisplay from "./personal_tax_displays/InterestIncomeDisplay";

interface FormData {
  personalInformation?: any;
  operatingIncome?: any;
  businessIncome?: any;
  dividendIncome?: any;
  interestIncome?: any;
  rentalIncome?: any;
  secondRentalIncome?: any;
  declaration?: any;
}

export default function PersonalTaxDisplay({
  formData,
}: {
  formData?: FormData;
}) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generatePDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    try {
      setIsGenerating(true);

      // Create loading indicator
      const loadingDiv = document.createElement("div");
      loadingDiv.style.position = "fixed";
      loadingDiv.style.top = "0";
      loadingDiv.style.left = "0";
      loadingDiv.style.width = "100%";
      loadingDiv.style.height = "100%";
      loadingDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      loadingDiv.style.display = "flex";
      loadingDiv.style.justifyContent = "center";
      loadingDiv.style.alignItems = "center";
      loadingDiv.style.zIndex = "9999";
      loadingDiv.innerHTML =
        '<div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">Generating PDF, please wait...</div>';
      document.body.appendChild(loadingDiv);

      // Hide PDF button
      const pdfButton = input.querySelector("button");
      let buttonOriginalDisplay = "";
      if (pdfButton) {
        buttonOriginalDisplay = pdfButton.style.display;
        pdfButton.style.display = "none";
      }

      // Create PDF with A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Get PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgWidth = pdfWidth - margin * 2;
      const sectionsToRender = [
        {
          title: "Personal Information",
          condition: !!formData?.personalInformation,
          render: (input: HTMLElement) => {
            const sections = input.querySelectorAll("main > section");
            return Array.from(sections).find((section) =>
              section
                .querySelector("h2")
                ?.textContent?.includes("PERSONAL INFORMATION")
            );
          },
        },
        {
          title: "Employment Income",
          condition: !!formData?.operatingIncome,
          render: (input: HTMLElement) => {
            const incomeDetailsSections = input.querySelectorAll(
              'main section div[class*="mt-4"]'
            );
            return Array.from(incomeDetailsSections).find((section) =>
              section
                .querySelector("h3")
                ?.textContent?.includes("Employment Income")
            );
          },
        },
        {
          title: "Business Income",
          condition: !!formData?.businessIncome,
          render: (input: HTMLElement) => {
            const incomeDetailsSections = input.querySelectorAll(
              'main section div[class*="mt-4"]'
            );
            return Array.from(incomeDetailsSections).find((section) =>
              section
                .querySelector("h3")
                ?.textContent?.includes("Business Income")
            );
          },
        },
        {
          title: "Investment Income",
          condition: !!(formData?.dividendIncome || formData?.interestIncome),
          render: (input: HTMLElement) => {
            const incomeDetailsSections = input.querySelectorAll(
              'main section div[class*="mt-4"]'
            );
            return Array.from(incomeDetailsSections).find((section) =>
              section
                .querySelector("h3")
                ?.textContent?.includes("Investment Income")
            );
          },
        },
        {
          title: "Rental Income",
          condition: !!(formData?.rentalIncome || formData?.secondRentalIncome),
          render: (input: HTMLElement) => {
            const incomeDetailsSections = input.querySelectorAll(
              'main section div[class*="mt-4"]'
            );
            return Array.from(incomeDetailsSections).find((section) =>
              section
                .querySelector("h3")
                ?.textContent?.includes("Rental Income")
            );
          },
        },
        {
          title: "Declaration",
          condition: !!formData?.declaration,
          render: (input: HTMLElement) => {
            const sections = input.querySelectorAll("main > section");
            return Array.from(sections).find((section) =>
              section.querySelector("h2")?.textContent?.includes("DECLARATION")
            );
          },
        },
      ];

      let yPosition = margin;
      let currentPage = 1;

      // Process each section with advanced page break logic
      for (const currentSection of sectionsToRender) {
        // Skip if condition is not met
        if (!currentSection.condition) continue;

        // Find the section in the document
        const currentSectionElement = currentSection.render(
          input as HTMLElement
        );
        if (!currentSectionElement) continue;

        // Render main section
        const mainCanvas = await html2canvas(
          currentSectionElement as HTMLElement,
          {
            scale: 1.5,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: "#ffffff",
          }
        );

        const mainImgData = mainCanvas.toDataURL("image/png");
        const mainImgHeight = (mainCanvas.height * imgWidth) / mainCanvas.width;

        // Intelligent page break logic
        const availablePageHeight = pdfHeight - margin * 2;

        // Check if section needs multi-page rendering
        if (yPosition + mainImgHeight > availablePageHeight) {
          pdf.addPage();
          currentPage++;
          yPosition = margin;
        }

        // Add main section to PDF
        pdf.addImage(
          mainImgData,
          "PNG",
          margin,
          yPosition,
          imgWidth,
          mainImgHeight
        );

        // Update vertical position
        yPosition += mainImgHeight + 10;
      }

      // Add page numbers
      const totalPages = pdf.getNumberOfPages();
      for (let j = 1; j <= totalPages; j++) {
        pdf.setPage(j);
        pdf.setFontSize(8);
        pdf.setTextColor(100);
        pdf.text(`Page ${j} of ${totalPages}`, pdfWidth - 25, pdfHeight - 10);
      }

      // Cleanup
      document.body.removeChild(loadingDiv);
      if (pdfButton) {
        pdfButton.style.display = buttonOriginalDisplay;
      }

      // Save PDF
      pdf.save("Personal_Tax_Income_Statement.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Check if formData exists and has any sections
  const hasFormData = formData && Object.keys(formData).length > 0;

  return (
    <section
      ref={pdfRef}
      className="max-w-[1300px] mx-auto my-12 border-2 border-black bg-white"
    >
      <header>
        <h1 className="font-bold text-xl p-4 py-6 border-b-2 border-black">
          CAMEROON TAXPAYER INCOME DECLARATION FORM (UNOFFICIAL)
        </h1>

        <div className="p-4 py-6 border-b-2 border-black">
          This form is used to <strong>declare income for tax purposes</strong>{" "}
          in accordance with the <b>Cameroon Finance Law of 2025.</b> Fill in
          all applicable sections, ensuring accuracy to avoid penalties. Provide{" "}
          <b>accurate information</b> to avoid tax penalties. Submit this form
          before <b>April 30, 2025</b> to comply with tax deadlines. Retain a
          copy of this form for personal records.
        </div>
      </header>

      {hasFormData ? (
        <main className="p-4 flex flex-col gap-6">
          {/* Personal Information Section */}
          {formData.personalInformation && (
            <section className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-green-800">
                SECTION 1: PERSONAL INFORMATION
              </h2>
              <p className="font-medium">
                (This section collects basic personal details for identification
                and tax purposes)
              </p>
              <div className="w-full">
                <PersonalInformationDisplay
                  formData={formData.personalInformation}
                />
              </div>
            </section>
          )}

          {/* Income Details Section */}
          <section className="flex flex-col gap-2 mt-6">
            <h2 className="text-xl font-bold text-green-800">
              SECTION 2: INCOME DETAILS
            </h2>
            <p className="font-medium">
              (Declare all income sources. Supporting documents must be attached
              where applicable.)
            </p>

            {/* Employment Income */}
            {formData.operatingIncome && (
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">
                  SECTION 2.1: Employment Income
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  (Income from salary, wages, and other employment-related
                  earnings)
                </p>
                <div className="w-full">
                  <IncomeDetailsDisplay formData={formData.operatingIncome} />
                </div>
              </div>
            )}

            {/* Business Income */}
            {formData.businessIncome && (
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">
                  SECTION 2.2: Business Income
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  (Income from self-employment, entrepreneurial activities, or
                  business operations)
                </p>
                <div className="w-full">
                  <BusinessIncomeDisplay formData={formData.businessIncome} />
                </div>
              </div>
            )}

            {/* Investment Income */}
            {(formData.dividendIncome || formData.interestIncome) && (
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">
                  SECTION 2.3: Investment Income
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  (Passive income from investments, dividends, and interest)
                </p>

                {/* Dividend Income */}
                {formData.dividendIncome && (
                  <div className="mb-4">
                    <h4 className="mb-2 font-medium">A) Dividend Income</h4>
                    <DividendIncomeDisplay formData={formData.dividendIncome} />
                  </div>
                )}

                {/* Interest Income */}
                {formData.interestIncome && (
                  <div>
                    <h4 className="mb-2 font-medium">B) Interest Income</h4>
                    <InterestIncomeDisplay formData={formData.interestIncome} />
                  </div>
                )}
              </div>
            )}

            {/* Rental Income */}
            {(formData.rentalIncome || formData.secondRentalIncome) && (
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">
                  SECTION 2.4: Rental Income
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  (Income from property rentals and leasing)
                </p>

                {/* First Rental Income */}
                {formData.rentalIncome && (
                  <div className="mb-4">
                    <h4 className="mb-2 font-medium">
                      A) First Rental Property
                    </h4>
                    <RentalIncomeDisplay formData={formData.rentalIncome} />
                  </div>
                )}

                {/* Second Rental Income */}
                {formData.secondRentalIncome && (
                  <div>
                    <h4 className="mb-2 font-medium">
                      B) Second Rental Property
                    </h4>
                    <SecondRentalIncomeDisplay
                      formData={formData.secondRentalIncome}
                    />
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Declaration Section */}
          {formData.declaration && (
            <section className="flex flex-col gap-2 mt-6">
              <h2 className="text-xl font-bold text-green-800">
                SECTION 3: DECLARATION AND SIGNATURE
              </h2>
              <p className="font-medium">
                I, the undersigned, certify that the information provided in
                this form is true and correct. I understand that false
                declaration may result in penalties as per the Cameroon Finance
                Law of 2025.
              </p>
              <div className="w-full">
                <DeclarationDisplay formData={formData.declaration} />
              </div>
            </section>
          )}
        </main>
      ) : (
        <div className="p-4 text-center text-gray-600">
          No form data available. Please complete the form.
        </div>
      )}

      {/* PDF Generation Button */}
      {hasFormData && (
        <div className="p-4 flex justify-center mt-4" id="pdf-button-container">
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className={`bg-green-700 text-white px-6 py-3 rounded transition-colors flex items-center gap-2 ${
              isGenerating
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-green-800"
            }`}
          >
            <NotepadText /> {isGenerating ? "Generating..." : "Generate PDF"}
          </button>
        </div>
      )}
    </section>
  );
}
