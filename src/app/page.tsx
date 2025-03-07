"use client";
import CompanyInformation from "@/components/coperate_tax/CompanyInformation";
import Declaration from "@/components/coperate_tax/Declaration";
import Expenses from "@/components/coperate_tax/Expenses";
import IncomeDetails from "@/components/coperate_tax/IncomeDetails";
import OtherIncomeSources from "@/components/coperate_tax/OtherSources";
import { Check, Edit, LucideIcon, NotepadText, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import FormDisplay from "@/components/FormDisplay";

export default function Home() {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const formDisplayRef = useRef<HTMLDivElement>(null);

  type FormButtonProps = {
    icon?: LucideIcon;
    children: string;
    onClick?: () => void;
  };

  const [formData, setFormData] = useState<any>({
    companyInformation: null,
    operatingIncome: null,
    otherIncomeSources: null,
    expenses: null,
    declaration: null,
  });

  useEffect(() => {
    const checkFormCompleteness = () => {
      const {
        companyInformation,
        operatingIncome,
        otherIncomeSources,
        expenses,
        declaration,
      } = formData;

      const isComplete =
        companyInformation !== null &&
        operatingIncome !== null &&
        otherIncomeSources !== null &&
        expenses !== null &&
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

      {/* Form sections */}
      <main className="p-4 flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-800">
            SECTION 1: COMPANY INFORMATION
          </h2>
          <p className="font-medium">
            (This section collects basic company details for identification and
            compliance)
          </p>
          <FormButton onClick={() => setActiveModal("companyInformation")}>
            COMPANY INFORMATION
          </FormButton>
          {activeModal === "companyInformation" &&
            renderModal(CompanyInformation, "companyInformation")}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-800">
            SECTION 2: INCOME DETAILS
          </h2>
          <p className="font-medium">
            (Declare all business income sources. Supporting documents must be
            attached where applicable.)
          </p>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="mb-2 font-semibold">
                SECTION 2.1: Operating Income
              </h3>
              <FormButton onClick={() => setActiveModal("operatingIncome")}>
                OPERATING INCOME
              </FormButton>
              {activeModal === "operatingIncome" &&
                renderModal(IncomeDetails, "operatingIncome")}
            </div>
            <div>
              <h3 className="mb-2 font-semibold">
                SECTION 2.2: Other Income Sources
              </h3>
              <FormButton onClick={() => setActiveModal("otherIncomeSources")}>
                OTHER INCOME SOURCES
              </FormButton>
              {activeModal === "otherIncomeSources" &&
                renderModal(OtherIncomeSources, "otherIncomeSources")}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-800">
            SECTION 3: EXPENSES
          </h2>
          <p className="font-medium">
            (List all business expenses. Attach supporting documents where
            applicable.)
          </p>
          <FormButton onClick={() => setActiveModal("expenses")}>
            EXPENSES
          </FormButton>
          {activeModal === "expenses" && renderModal(Expenses, "expenses")}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-800">
            SECTION 4: DECLARATION AND SIGNATURE
          </h2>
          <div className="mb-2">
            <span className="font-semibold">Declaration: </span>
            <p className="font-medium">
              I, the undersigned, certify that the information provided in this
              Corporate Tax Income is <b>true, accurate, and complete</b>. I
              understand that providing <b>false or misleading</b> information
              may result in penalties under the{" "}
              <b>Cameroon Finance Law of 2025</b>
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
          <Check size={16} />
          <p className="text-[14px] font-medium">
            Submit this form along with required supporting documents to the
            Cameroon Tax Authority
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Check size={16} />
          <p className="text-[14px] font-medium">
            Ensure all figures are in XAF (Central African CFA franc)
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Check size={16} />
          <p className="text-[14px] font-medium">
            Keep a copy of this Form for your records
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
            Submit Corporate Tax Form
          </button>
        ) : (
          <div ref={formDisplayRef} className="w-full">
            <FormDisplay formData={formData} />
          </div>
        )}
      </div>
    </section>
  );
}
