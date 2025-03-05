"use client";
import React, { useState } from "react";

// Define an interface for the initial data props and saved data
interface IncomeDetailsProps {
initialData?: {
  natureOfEmployer?: string;
  grossAnnualSalary?: string;
  paidTaxes?: string;
  housingAllowance?: string;
  medicalAllowance?: string;
  transportationAllowance?: string;
  otherBenefits?: string;
  totalEmploymentIncome?: string;
};
onSave?: (data: IncomeDetailsData) => void;
}

// Interface for the saved data structure
interface IncomeDetailsData {
natureOfEmployer: string;
grossAnnualSalary: string;
paidTaxes: string;
housingAllowance: string;
medicalAllowance: string;
transportationAllowance: string;
otherBenefits: string;
totalEmploymentIncome: string;
}

function IncomeDetails({ initialData = {}, onSave }: IncomeDetailsProps) {
// State for various input fields
const [natureOfEmployer, setNatureOfEmployer] = useState(
  initialData.natureOfEmployer || ""
);
const [grossAnnualSalary, setGrossAnnualSalary] = useState(
  initialData.grossAnnualSalary || ""
);
const [paidTaxes, setPaidTaxes] = useState(
  initialData.paidTaxes || ""
);
const [housingAllowance, setHousingAllowance] = useState(
  initialData.housingAllowance || ""
);
const [medicalAllowance, setMedicalAllowance] = useState(
  initialData.medicalAllowance || ""
);
const [transportationAllowance, setTransportationAllowance] = useState(
  initialData.transportationAllowance || ""
);
const [otherBenefits, setOtherBenefits] = useState(
  initialData.otherBenefits || ""
);
const [totalEmploymentIncome, setTotalEmploymentIncome] = useState(
  initialData.totalEmploymentIncome || ""
);

// State for validation errors
const [errors, setErrors] = useState<{ [key: string]: string }>({});

// Calculation effect
React.useEffect(() => {
  const calculateTotalEmploymentIncome = () => {
    const salaryNum = parseFloat(grossAnnualSalary) || 0;
    const housingNum = parseFloat(housingAllowance) || 0;
    const medicalNum = parseFloat(medicalAllowance) || 0;
    const transportNum = parseFloat(transportationAllowance) || 0;
    const otherNum = parseFloat(otherBenefits) || 0;
    const taxesNum = parseFloat(paidTaxes) || 0;

    const totalIncome = salaryNum + housingNum + medicalNum + 
                        transportNum + otherNum - taxesNum;

    setTotalEmploymentIncome(totalIncome.toString());
  };

  calculateTotalEmploymentIncome();
}, [
  grossAnnualSalary, 
  housingAllowance, 
  medicalAllowance, 
  transportationAllowance, 
  otherBenefits,
  paidTaxes
]);

// Validation function
const validateFields = (): boolean => {
  const newErrors: { [key: string]: string } = {};

  // Validate Nature of Employer
  if (!natureOfEmployer) {
    newErrors.natureOfEmployer = "Nature of Employer is required";
  }

  // Validate Gross Annual Salary
  if (!grossAnnualSalary || parseFloat(grossAnnualSalary) < 0) {
    newErrors.grossAnnualSalary = "Gross Annual Salary must be a positive number";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Handle Save Function
const handleSave = () => {
  // Validate fields first
  // if (!validateFields()) {
  //   return;
  // }

  // Prepare data object
  const incomeDetailsData: IncomeDetailsData = {
    natureOfEmployer,
    grossAnnualSalary,
    paidTaxes,
    housingAllowance,
    medicalAllowance,
    transportationAllowance,
    otherBenefits,
    totalEmploymentIncome
  };

  // If onSave prop is provided, call it
  if (onSave) {
    onSave(incomeDetailsData);
  } else {
    // Fallback logging if no onSave handler
    console.log("Income Details Data:", incomeDetailsData);
  }
};

return (
  <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
    {/* Nature of Employer */}
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">
          2a. Nature of Business
        </h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">
            Type of employer (e.g, Private, Government, NGO)
          </i>
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1 justify-center w-full">
          <input
            type="text"
            value={natureOfEmployer}
            onChange={(e) => setNatureOfEmployer(e.target.value)}
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.natureOfEmployer ? "border-2 border-red-500" : ""}`}
          />
        </div>
        {errors.natureOfEmployer && (
          <p className="text-red-500 text-sm mt-1">{errors.natureOfEmployer}</p>
        )}
      </div>
    </div>

    {/* Gross Annual Salary */}
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">
          2b. Gross Annual Salary
        </h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">Total yearly salary before deduction</i>
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={grossAnnualSalary}
            onChange={(e) =>
              setGrossAnnualSalary(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.grossAnnualSalary ? "border-2 border-red-500" : ""}`}
          />
        </div>
        {errors.grossAnnualSalary && (
          <p className="text-red-500 text-sm mt-1">{errors.grossAnnualSalary}</p>
        )}
      </div>
    </div>

    {/* Paid Taxes */}
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">
          2c. Paid Taxes (if any paid)
        </h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">Taxes deducted by employer</i>
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={paidTaxes}
            onChange={(e) =>
              setPaidTaxes(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
          />
        </div>
      </div>
    </div>

    {/* Allowances and Benefits Section */}
    <div className="border-b-2 border-black p-6 flex-col flex items-center justify-between gap-1 w-full">
      <h2 className="text-lg font-bold text-gray-800">
        ALLOWANCES AND BENEFITS
      </h2>
      <p className="text-sm text-gray-600">
        <i className="text-sm">Additional employer-provided benefits</i>
      </p>
    </div>

    {/* Housing Allowance */}
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-sm text-gray-800">
          <i className="text-sm">
            2d. Housing Allowance Assistance for accommodation
          </i>
        </h2>
      </div>
      <div className="flex items-center gap-1 justify-center w-full">
        <h2>XAF</h2>
        <input
          type="text"
          value={housingAllowance}
          onChange={(e) =>
            setHousingAllowance(e.target.value.replace(/[^0-9.]/g, ""))
          }
          className="bg-[#f2faff] w-[100%] p-4 outline-none"
        />
      </div>
    </div>

    {/* Medical Allowance */}
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <p className="text-sm text-gray-800">
          <i className="text-sm">
            2e. Medical Allowance (if paid directly as part of salary)
          </i>
        </p>
        <p className="text-sm text-gray-600">
          <i className="text-sm">Assistance for Health</i>
        </p>
      </div>
      <div className="flex items-center gap-1 justify-center w-full">
        <h2>XAF</h2>
        <input
          type="text"
          value={medicalAllowance}
          onChange={(e) =>
            setMedicalAllowance(e.target.value.replace(/[^0-9.]/g, ""))
          }
          className="bg-[#f2faff] w-[100%] p-4 outline-none"
        />
      </div>
    </div>

    {/* Transportation Allowance */}
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <p className="text-sm text-gray-800">
          <i className="text-sm">
            2f. Transportation Allowance Travel-related benefits
          </i>
        </p>
      </div>
      <div className="flex items-center gap-1 justify-center w-full">
        <h2>XAF</h2>
        <input
          type="text"
          value={transportationAllowance}
          onChange={(e) =>
            setTransportationAllowance(e.target.value.replace(/[^0-9.]/g, ""))
          }
          className="bg-[#f2faff] w-[100%] p-4 outline-none"
        />
      </div>
    </div>

    {/* Other Benefits */}
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <p className="text-sm text-gray-800">
          <i className="text-sm">2g. Other Benefits</i>
        </p>
        <p className="text-sm text-gray-600">
          <i className="text-sm">
            Any other taxable allowances (Meal, Entertainment, Performance Bonuses, 
            Overtime Pay, Responsibility Allowance, Risk Allowance, 
            Professional Development Allowance)
          </i>
        </p>
      </div>
      <div className="flex items-center gap-1 justify-center w-full">
        <h2>XAF</h2>
        <input
          type="text"
          value={otherBenefits}
          onChange={(e) =>
            setOtherBenefits(e.target.value.replace(/[^0-9.]/g, ""))
          }
          className="bg-[#f2faff] w-[100%] p-4 outline-none"
        />
      </div>
    </div>

    {/* Total Employment Income */}
    <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">
          2h. Total Employment Income
        </h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">Sum of salary + benefits - taxes</i>
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={totalEmploymentIncome}
            readOnly
            className="bg-[#f2faff] w-[100%] p-4 outline-none font-bold"
          />
        </div>
      </div>
    </div>

    {/* Save Button */}
    <div className="flex justify-end p-4 space-x-4">
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors"
      >
        Save
      </button>
    </div>
  </section>
);
}

export default IncomeDetails;