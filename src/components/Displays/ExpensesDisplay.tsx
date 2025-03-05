"use client";
import React from "react";

// Define the interface for the form data
interface ExpensesDisplayProps {
  formData: {
    salariesAndWages: string;
    familyAllowance: string;
    pensionAndDisability: string;
    workAccidentInsurance: string;
    nsifContributions: string;
    housingFundContributions: string;
    nationalEmploymentFund: string;
    healthInsuranceContributions: string;
    rentAndUtilities: string;
    depreciationAndAmortization: string;
    marketingAndAdvertising: string;
    loanInterestPayments: string;
    researchAndDevelopment: string;
    otherOperatingExpenses: string;
    totalExpenses: string;
  };
}

const ExpensesDisplay: React.FC<ExpensesDisplayProps> = ({ formData }) => {
  const renderDisplayField = (
    label: string,
    description: string,
    value: string,
    unit: string = "XAF"
  ) => (
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">{description}</i>
        </p>
      </div>
      <div className="flex items-center gap-1 justify-center w-full">
        <div className="text-end w-[100%] p-4">
          {value ? `${unit}   ${value}` : "N/A"}
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Render all display fields */}
      {renderDisplayField(
        "Salaries & Wages",
        "Total employee payments before deductions",
        formData.salariesAndWages
      )}
      {renderDisplayField(
        "Family Allowance",
        "Employer's contribution to family benefits",
        formData.familyAllowance
      )}
      {renderDisplayField(
        "Pension & Disability",
        "Contributions to pension and disability insurance",
        formData.pensionAndDisability
      )}
      {renderDisplayField(
        "Work Accident Insurance",
        "Premiums paid for workplace injury coverage",
        formData.workAccidentInsurance
      )}
      {renderDisplayField(
        "NSIF Contributions",
        "Mandatory employer contributions to National Social Insurance Fund",
        formData.nsifContributions
      )}
      {renderDisplayField(
        "Housing Fund Contributions",
        "Employer's share in government housing schemes",
        formData.housingFundContributions
      )}
      {renderDisplayField(
        "National Employment Fund",
        "Payments for workforce development and training programs",
        formData.nationalEmploymentFund
      )}
      {renderDisplayField(
        "Health Insurance Contributions",
        "Employer-sponsored employee health coverage",
        formData.healthInsuranceContributions
      )}
      {renderDisplayField(
        "Rent and Utilities",
        "Payments for office/factory rent, electricity, water, and internet",
        formData.rentAndUtilities
      )}
      {renderDisplayField(
        "Depreciation & Amortization",
        "Non-cash costs for asset wear and tear",
        formData.depreciationAndAmortization
      )}
      {renderDisplayField(
        "Marketing & Advertising",
        "Business promotion and customer outreach expenses",
        formData.marketingAndAdvertising
      )}
      {renderDisplayField(
        "Loan Interest Payments",
        "Interest paid on company debts or loans",
        formData.loanInterestPayments
      )}
      {renderDisplayField(
        "Research & Development (R&D)",
        "Expenditures for innovation and product development",
        formData.researchAndDevelopment
      )}
      {renderDisplayField(
        "Other Operating Expenses",
        "Miscellaneous operational costs",
        formData.otherOperatingExpenses
      )}

      {/* Total Expenses */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-bold text-gray-800">Total Expenses</h2>
          <p className="text-sm text-gray-600">
            <i>Sum of all declared expenses</i>
          </p>
        </div>

        <div className="flex items-center gap-1 justify-center w-full">
          <div className="text-end w-[100%] p-4 font-bold">
            {formData.totalExpenses
              ? `XAF ${formData.totalExpenses
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpensesDisplay;
