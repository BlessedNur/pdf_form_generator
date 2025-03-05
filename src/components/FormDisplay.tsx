"use client";
import React, { useRef, useState } from "react";
import CompanyInformationDisplay from "@/components/Displays/CompanyInformationDisplay";
import IncomeDetailsDisplay from "@/components/Displays/IncomeDetailsDisplay";
import OtherIncomeSourcesDisplay from "@/components/Displays/OtherIncomeSourcesDisplay";
import ExpensesDisplay from "@/components/Displays/ExpensesDisplay";
import DeclarationDisplay from "@/components/Displays/DeclarationDisplay";
import { Check, NotepadText } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface FormData {
  companyInformation?: any;
  operatingIncome?: any;
  otherIncomeSources?: any;
  expenses?: any;
  declaration?: any;
}

export default function FormDisplay({ formData }: { formData?: FormData }) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const calculateSplitPoint = (availableHeight: number, imgHeight: number) => {
    const MIN_SPLIT = 100; // Minimum height for first part (px)
    if (imgHeight <= availableHeight) return imgHeight;
    return Math.max(MIN_SPLIT, availableHeight - 20);
  };
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
  
      // Select all sections to render
      const sectionsToRender = Array.from(
        input.querySelectorAll("header, main > section, div.p-4.mt-6")
      );
  
      let yPosition = margin;
      let currentPage = 1;
  
      // Process each section with advanced page break logic
      for (let i = 0; i < sectionsToRender.length; i++) {
        const section = sectionsToRender[i];
        const sectionTitle = section.querySelector("h2, h3")?.textContent || "";
  
        // Use consistent scaling and rendering for all sections
        const canvas = await html2canvas(section as HTMLElement, {
          scale: 1.5, // Increased scale for better quality
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });
  
        const imgData = canvas.toDataURL("image/png");
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // Intelligent page break logic
        const availablePageHeight = pdfHeight - margin * 2;
        
        // Check if section needs multi-page rendering
        if (yPosition + imgHeight > availablePageHeight) {
          // Add new page if current section doesn't fit
          pdf.addPage();
          currentPage++;
          yPosition = margin;
        }
  
        // Add section to PDF
        pdf.addImage(
          imgData, 
          "PNG", 
          margin, 
          yPosition, 
          imgWidth, 
          imgHeight
        );
  
        // Update vertical position
        yPosition += imgHeight + 5; // Small buffer between sections
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
      pdf.save("Corporate_Tax_Income_Statement.pdf");
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
          CAMEROON CORPORATE TAX INCOME STATEMENT
        </h1>

        <div className="p-4 py-6 border-b-2 border-black">
          <span className="font-semibold">Instructions: </span>
          <p className="inline">
            Complete all sections accurately. Attach supporting documents where
            required. Providing false or misleading information may result in
            penalties under the <strong>Cameroon Finance Law of 2025</strong>
          </p>
        </div>
      </header>

      {hasFormData ? (
        <main className="p-4 flex flex-col gap-6">
          {/* Company Information Section */}
          {formData.companyInformation && (
            <>
              <section className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-green-800">
                  SECTION 1: COMPANY INFORMATION
                </h2>
                <p className="font-medium">
                  (This section collects basic company details for
                  identification and compliance)
                </p>
                <div className="w-full">
                  <CompanyInformationDisplay
                    formData={formData.companyInformation}
                  />
                </div>
              </section>
              <section className="flex flex-col gap-2 mt-6">
                <h2 className="text-xl font-bold text-green-800">
                  SECTION 2: INCOME DETAILS
                </h2>
                <p className="font-medium">
                  (Declare all business income sources. Supporting documents
                  must be attached where applicable.)
                </p>
                <div className="flex flex-col gap-2">
                  {/* Operating Income */}
                  {formData.operatingIncome && (
                    <div>
                      <h3 className="mb-2 font-semibold">
                        SECTION 2.1: Operating Income
                      </h3>
                      <div className="w-full">
                        <IncomeDetailsDisplay
                          formData={formData.operatingIncome}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}

          {/* Income Details Section */}
          {(formData.operatingIncome || formData.otherIncomeSources) && (
            <section className="flex flex-col gap-2 mt-6">
              <div className="flex flex-col gap-2">
                {/* Other Income Sources */}
                {formData.otherIncomeSources && (
                  <div className="mt-4">
                    <h3 className="mb-2 font-semibold">
                      SECTION 2.2: Other Income Sources
                    </h3>
                    <div className="w-full">
                      <OtherIncomeSourcesDisplay
                        formData={formData.otherIncomeSources}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Expenses Section */}
          {formData.expenses && (
            <section className="flex flex-col gap-2 mt-6">
              <h2 className="text-xl font-bold text-green-800">
                SECTION 3: EXPENSES
              </h2>
              <p className="font-medium">
                (List all business expenses. Attach supporting documents where
                applicable.)
              </p>
              <div className="w-full">
                <ExpensesDisplay formData={formData.expenses} />
              </div>
            </section>
          )}

          {/* Declaration Section */}
          {formData.declaration && (
            <section className="flex flex-col gap-2 mt-6">
              <h2 className="text-xl font-bold text-green-800">
                SECTION 4: DECLARATION AND SIGNATURE
              </h2>
              <div className="mb-2">
                <span className="font-semibold">Declaration: </span>
                <p className="font-medium">
                  I, the undersigned, certify that the information provided in
                  this Corporate Tax Income is{" "}
                  <b>true, accurate, and complete</b>. I understand that
                  providing <b>false or misleading</b> information may result in
                  penalties under the <b>Cameroon Finance Law of 2025</b>
                </p>
              </div>
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
