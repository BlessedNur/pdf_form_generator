"use client";
import React, { useState, useEffect } from "react";

interface ExpensesData {
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
}

interface ExpensesProps {
  initialData?: Partial<ExpensesData>;
  onSave?: (data: ExpensesData) => void;
}

function Expenses({ initialData = {}, onSave }: ExpensesProps) {
  const [expensesData, setExpensesData] = useState<ExpensesData>({
    salariesAndWages: initialData.salariesAndWages || "",
    familyAllowance: initialData.familyAllowance || "",
    pensionAndDisability: initialData.pensionAndDisability || "",
    workAccidentInsurance: initialData.workAccidentInsurance || "",
    nsifContributions: initialData.nsifContributions || "",
    housingFundContributions: initialData.housingFundContributions || "",
    nationalEmploymentFund: initialData.nationalEmploymentFund || "",
    healthInsuranceContributions:
      initialData.healthInsuranceContributions || "",
    rentAndUtilities: initialData.rentAndUtilities || "",
    depreciationAndAmortization: initialData.depreciationAndAmortization || "",
    marketingAndAdvertising: initialData.marketingAndAdvertising || "",
    loanInterestPayments: initialData.loanInterestPayments || "",
    researchAndDevelopment: initialData.researchAndDevelopment || "",
    otherOperatingExpenses: initialData.otherOperatingExpenses || "",
    totalExpenses: initialData.totalExpenses || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    calculateTotalExpenses();
  }, [
    expensesData.salariesAndWages,
    expensesData.familyAllowance,
    expensesData.pensionAndDisability,
    expensesData.workAccidentInsurance,
    expensesData.nsifContributions,
    expensesData.housingFundContributions,
    expensesData.nationalEmploymentFund,
    expensesData.healthInsuranceContributions,
    expensesData.rentAndUtilities,
    expensesData.depreciationAndAmortization,
    expensesData.marketingAndAdvertising,
    expensesData.loanInterestPayments,
    expensesData.researchAndDevelopment,
    expensesData.otherOperatingExpenses,
  ]);

  const calculateTotalExpenses = () => {
    const expenseFields: (keyof ExpensesData)[] = [
      "salariesAndWages",
      "familyAllowance",
      "pensionAndDisability",
      "workAccidentInsurance",
      "nsifContributions",
      "housingFundContributions",
      "nationalEmploymentFund",
      "healthInsuranceContributions",
      "rentAndUtilities",
      "depreciationAndAmortization",
      "marketingAndAdvertising",
      "loanInterestPayments",
      "researchAndDevelopment",
      "otherOperatingExpenses",
    ];

    const total = expenseFields.reduce((sum, field) => {
      return sum + (parseFloat(expensesData[field]) || 0);
    }, 0);

    setExpensesData((prev) => ({
      ...prev,
      totalExpenses: total.toString(),
    }));
  };

  const handleInputChange = (field: keyof ExpensesData, value: string) => {
    setExpensesData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const numericFields: (keyof ExpensesData)[] = [
      "salariesAndWages",
      "familyAllowance",
      "pensionAndDisability",
      "workAccidentInsurance",
      "nsifContributions",
      "housingFundContributions",
      "nationalEmploymentFund",
      "healthInsuranceContributions",
      "rentAndUtilities",
      "depreciationAndAmortization",
      "marketingAndAdvertising",
      "loanInterestPayments",
      "researchAndDevelopment",
      "otherOperatingExpenses",
    ];

    numericFields.forEach((field) => {
      const value = parseFloat(expensesData[field]);
      if (value && value < 0) {
        newErrors[field] = `${field.replace(
          /([A-Z])/g,
          " $1"
        )} must be a non-negative number`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // if (!validateFields()) {
    //   return;
    // }

    if (onSave) {
      onSave(expensesData);
    } else {
      console.log("Expenses Data:", expensesData);
    }
  };

  const renderInputField = (
    label: string,
    description: string,
    field: keyof ExpensesData,
    unit: string = "XAF"
  ) => (
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">{description}</i>
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>{unit}</h2>
          <input
            type="text"
            value={expensesData[field]}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9.]/g, "");
              handleInputChange(field, numericValue);
            }}
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              `}
          />
        </div>
        
      </div>
    </div>
  );

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Render all input fields */}
      {renderInputField(
        "Salaries & Wages",
        "Total employee payments before deductions",
        "salariesAndWages"
      )}
      {renderInputField(
        "Family Allowance",
        "Employer's contribution to family benefits",
        "familyAllowance"
      )}
      {renderInputField(
        "Pension & Disability",
        "Contributions to pension and disability insurance",
        "pensionAndDisability"
      )}
      {renderInputField(
        "Work Accident Insurance",
        "Premiums paid for workplace injury coverage",
        "workAccidentInsurance"
      )}
      {renderInputField(
        "NSIF Contributions",
        "Mandatory employer contributions to National Social Insurance Fund",
        "nsifContributions"
      )}
      {renderInputField(
        "Housing Fund Contributions",
        "Employer's share in government housing schemes",
        "housingFundContributions"
      )}
      {renderInputField(
        "National Employment Fund",
        "Payments for workforce development and training programs",
        "nationalEmploymentFund"
      )}
      {renderInputField(
        "Health Insurance Contributions",
        "Employer-sponsored employee health coverage",
        "healthInsuranceContributions"
      )}
      {renderInputField(
        "Rent and Utilities",
        "Payments for office/factory rent, electricity, water, and internet",
        "rentAndUtilities"
      )}
      {renderInputField(
        "Depreciation & Amortization",
        "Non-cash costs for asset wear and tear",
        "depreciationAndAmortization"
      )}
      {renderInputField(
        "Marketing & Advertising",
        "Business promotion and customer outreach expenses",
        "marketingAndAdvertising"
      )}
      {renderInputField(
        "Loan Interest Payments",
        "Interest paid on company debts or loans",
        "loanInterestPayments"
      )}
      {renderInputField(
        "Research & Development (R&D)",
        "Expenditures for innovation and product development",
        "researchAndDevelopment"
      )}
      {renderInputField(
        "Other Operating Expenses",
        "Miscellaneous operational costs",
        "otherOperatingExpenses"
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
          <h2>XAF</h2>
          <input
            type="number"
            value={expensesData.totalExpenses}
            readOnly
            className="bg-[#f2faff] w-[100%] p-4 outline-none font-bold"
          />
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

export default Expenses;
