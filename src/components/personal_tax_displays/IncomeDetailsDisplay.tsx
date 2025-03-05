"use client";
import React from "react";

interface IncomeDetailsDisplayProps {
  formData: {
    natureOfEmployer: string;
    grossAnnualSalary: string;
    paidTaxes: string;
    housingAllowance: string;
    medicalAllowance: string;
    transportationAllowance: string;
    otherBenefits: string;
    totalEmploymentIncome: string;
  };
}

const IncomeDetailsDisplay: React.FC<IncomeDetailsDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Nature of Employer */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            2a. Nature of Business
          </h2>
          <p className="text-sm text-gray-600">
            <i>Type of employer (e.g, Private, Government, NGO)</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.natureOfEmployer || "N/A"}
          </div>
        </div>
      </div>

      {/* Gross Annual Salary */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            2b. Gross Annual Salary
          </h2>
          <p className="text-sm text-gray-600">
            <i>Total yearly salary before deduction</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.grossAnnualSalary
              ? `XAF ${formData.grossAnnualSalary}`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Paid Taxes */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            2c. Paid Taxes (if any paid)
          </h2>
          <p className="text-sm text-gray-600">
            <i>Taxes deducted by employer</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.paidTaxes ? `XAF ${formData.paidTaxes}` : "N/A"}
          </div>
        </div>
      </div>

      {/* Allowances and Benefits Section Header */}
      <div className="border-b-2 border-black p-6 flex-col flex items-center justify-between gap-1 w-full">
        <h2 className="text-lg font-bold text-gray-800">
          ALLOWANCES AND BENEFITS
        </h2>
        <p className="text-sm text-gray-600">
          <i>Additional employer-provided benefits</i>
        </p>
      </div>

      {/* Housing Allowance */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-sm text-gray-800">
            <i>2d. Housing Allowance Assistance for accommodation</i>
          </h2>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.housingAllowance
              ? `XAF ${formData.housingAllowance}`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Medical Allowance */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <p className="text-sm text-gray-800">
            <i>2e. Medical Allowance (if paid directly as part of salary)</i>
          </p>
          <p className="text-sm text-gray-600">
            <i>Assistance for Health</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.medicalAllowance
              ? `XAF ${formData.medicalAllowance}`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Transportation Allowance */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <p className="text-sm text-gray-800">
            <i>2f. Transportation Allowance Travel-related benefits</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.transportationAllowance
              ? `XAF ${formData.transportationAllowance}`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Other Benefits */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <p className="text-sm text-gray-800">
            <i>2g. Other Benefits</i>
          </p>
          <p className="text-sm text-gray-600">
            <i>
              Any other taxable allowances (Meal, Entertainment, Performance
              Bonuses, Overtime Pay, Responsibility Allowance, Risk Allowance,
              Professional Development Allowance)
            </i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.otherBenefits ? `XAF ${formData.otherBenefits}` : "N/A"}
          </div>
        </div>
      </div>

      {/* Total Employment Income */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            2h. Total Employment Income
          </h2>
          <p className="text-sm text-gray-600">
            <i>Sum of salary + benefits - taxes</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4 font-bold">
            {formData.totalEmploymentIncome
              ? `XAF ${formData.totalEmploymentIncome
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomeDetailsDisplay;
