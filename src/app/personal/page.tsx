"use client";
import Declaration from "@/components/personal_tax/Declaration";
import IncomeDetails from "@/components/personal_tax/IncomeDetails";
import { Check, Edit, LucideIcon, NotepadText, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import FormDisplay from "@/components/FormDisplay";
import BusinessIncome from "@/components/personal_tax/BusinessIncome";
import PersonalInformation from "@/components/personal_tax/PersonalInformation";
import DividendIncome from "@/components/personal_tax/DividendIncome";
import InterestIncome from "@/components/personal_tax/InterestIncome";
import RentalIncome from "@/components/personal_tax/RentalIncome";
import SecondRentalIncome from "@/components/personal_tax/SecondRentalIncome";
import PersonalTaxDisplay from "@/components/PersonaTaxDisplay";

export default function Home() {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const formDisplayRef = useRef<HTMLDivElement>(null);

  type FormButtonProps = {
    icon?: LucideIcon;
    children: string;
    onClick?: () => void;
  };

  const [formData, setFormData] = useState<any>({
    personalInformation: null,
    operatingIncome: null,
    businessIncome: null,
    declaration: null,
    dividendIncome: null, // Corrected key
    interestIncome: null,
    rentalIncome: null,
    secondRentalIncome: null, // Added for completeness
  });
  console.log(formData);

  useEffect(() => {
    const checkFormCompleteness = () => {
      const {
        personalInformation,
        operatingIncome,
        businessIncome,
        dividendIncome, // Corrected key
        interestIncome,
        rentalIncome,
        secondRentalIncome,
        declaration,
      } = formData;

      const isComplete =
        personalInformation !== null &&
        operatingIncome !== null &&
        businessIncome !== null &&
        dividendIncome !== null &&
        interestIncome !== null &&
        rentalIncome !== null &&
        secondRentalIncome !== null &&
        declaration !== null;

      setIsFormComplete(isComplete);
    };

    checkFormCompleteness();
  }, [formData]);

  const [showFormDisplay, setShowFormDisplay] = useState(false);

  // Form submission handler
  const handleSubmit = () => {
    if (!isFormComplete) {
      alert("Please complete all sections before submitting.");
      return;
    }

    // Show form display section
    setShowFormDisplay(true);

    // Scroll to form display after rendering
    setTimeout(() => {
      if (formDisplayRef.current) {
        formDisplayRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModal = (
    ModalComponent: React.ComponentType<any>,
    section: string
  ) => {
    const handleSave = (data: any) => {
      setFormData((prev: any) => ({
        ...prev,
        [section]: data,
      }));
      setActiveModal(null);
    };

    return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm grid place-content-center overflow-y-auto">
        <div
          className="bg-white max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <ModalComponent
            initialData={formData[section] || {}}
            onSave={handleSave}
            onClose={() => setActiveModal(null)}
          />
          <X
            size={40}
            onClick={() => setActiveModal(null)}
            className="fixed top-4 right-4 cursor-pointer"
          />
        </div>
      </div>
    );
  };

  const FormButton = ({
    icon: Icon = NotepadText,
    children,
    onClick,
  }: FormButtonProps) => (
    <button
      onClick={onClick}
      className="
        w-full 
        max-w-[400px] 
        border-2 
        border-green-800 
        text-green-900 
        flex 
        items-center 
        justify-center 
        gap-3 
        py-3 
        px-4 
        hover:bg-green-50 
        transition-colors 
        duration-300 
        group
      "
    >
      <Icon className="text-green-800 group-hover:scale-110 transition-transform" />
      <span className="font-semibold text-base">{children}</span>
      <Edit className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-green-600" />
    </button>
  );

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  return (
    <section className="max-w-[1300px] border-2 border-black mx-auto my-12">
      <h1 className="font-bold text-xl p-4 py-6 border-b-2 border-black">
        CAMEROON TAXPAYER INCOME DECLARATION FORM (UNOFFICIAL)
      </h1>
      <div className="p-4 py-6 border-b-2 border-black">
        This form is used to <strong>declare income for tax purposes</strong> in
        accordance with the <b>Cameroon Finance Law of 2025.</b> Fill in all
        applicable sections, ensuring accuracy to avoid penalties. Provide{" "}
        <b>accurate information</b> to avoid tax penalties. Submit this form
        before <b>April 30, 2025</b> to comply with tax deadlines. Retain a copy
        of this form for personal records.
      </div>

      {/* Form sections */}
      <main className="p-4 flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-800">
            SECTION 1: PERSONAL INFORMATION
          </h2>

          <FormButton onClick={() => setActiveModal("personalInformation")}>
            PERSONAL INFORMATION
          </FormButton>
          {activeModal === "personalInformation" &&
            renderModal(PersonalInformation, "personalInformation")}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-800">
            SECTION 2: INCOME DETAILS
          </h2>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="mb-2 font-semibold">
                SECTION 2.1: Employment Income (For salaried individuals)
              </h3>
              <FormButton onClick={() => setActiveModal("operatingIncome")}>
                EMPLOYMENT INCOME
              </FormButton>
              {activeModal === "operatingIncome" &&
                renderModal(IncomeDetails, "operatingIncome")}
            </div>
            <div>
              <h3 className="mb-2 font-semibold">
                SECTION 2.2: Business Income (For business owners and
                self-employed individuals)
              </h3>
              <FormButton onClick={() => setActiveModal("businessIncome")}>
                BUSINESS INCOME
              </FormButton>
              {activeModal === "businessIncome" &&
                renderModal(BusinessIncome, "businessIncome")}
            </div>
            <div>
              <h3 className="mb-2 font-semibold">
                SECTION 2.3: Investment Income (For individuals earning passive
                income)
              </h3>
              <div>
                <h4 className="mb-2 font-medium">
                  A) Dividend Income (Profit earned from owning shares in a
                  company)
                </h4>
                <FormButton onClick={() => setActiveModal("dividendIncome")}>
                  DIVIDEND INCOME
                </FormButton>
                {activeModal === "dividendIncome" &&
                  renderModal(DividendIncome, "dividendIncome")}
              </div>
              <div className="mt-4">
                <h4 className="mb-2 font-medium">
                  B) Interest Income (Money earned from lending or saving money)
                </h4>
                <FormButton onClick={() => setActiveModal("interestIncome")}>
                  INTEREST INCOME
                </FormButton>
                {activeModal === "interestIncome" &&
                  renderModal(InterestIncome, "interestIncome")}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">
                C) Rental Income (Money earned from renting out
                property)
              </h3>
              <div>
                <h4 className="mb-2 font-medium">
                  First Rental Property (e.g., houses, apartments, offices, or
                  land)
                </h4>
                <FormButton onClick={() => setActiveModal("rentalIncome")}>
                  FIRST RENTAL INCOME
                </FormButton>
                {activeModal === "rentalIncome" &&
                  renderModal(RentalIncome, "rentalIncome")}
              </div>
              <div className="mt-4">
                <h4 className="mb-2 font-medium">
                  Second Rental Property (if applicable)
                </h4>
                <FormButton
                  onClick={() => setActiveModal("secondRentalIncome")}
                >
                  SECOND RENTAL INCOME
                </FormButton>
                {activeModal === "secondRentalIncome" &&
                  renderModal(SecondRentalIncome, "secondRentalIncome")}
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-800">
            SECTION 3: DECLARATION AND SIGNATURE
          </h2>
          <div className="mb-2">
            <p className="font-medium">
              I, the undersigned, certify that the information provided in this
              form is true and correct. I understand that false declaration may
              result in penalties as per the Cameroon Finance Law of 2025.
            </p>
          </div>
          <FormButton onClick={() => setActiveModal("declaration")}>
            DECLARATION AND SIGNATURE
          </FormButton>
          {activeModal === "declaration" &&
            renderModal(Declaration, "declaration")}
        </section>
      </main>

      {/* Submission Instructions */}
      <div className="p-4">
        <h3 className="text-2xl text-red-600 font-bold">
          Submission Instructions
        </h3>
        <div className="flex items-center gap-1">
          <p className="text-[14px] font-medium">
            Annual Income Tax Declaration Deadline: April 30, 2025.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-[14px] font-medium">
            Late submission may result in fines or penalties.
          </p>
        </div>
      </div>

      {/* Submit button or display form */}
      <div className="p-4 flex justify-center">
        {!showFormDisplay ? (
          <button
            onClick={handleSubmit}
            disabled={!isFormComplete}
            className={`
              px-8 
              py-3 
              rounded 
              transition-colors 
              ${
                isFormComplete
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Submit Personal Tax Form
          </button>
        ) : (
          <div ref={formDisplayRef} className="w-full">
            <PersonalTaxDisplay formData={formData} />
          </div>
        )}
      </div>
    </section>
  );
}
