"use client";
import React, { useState, useEffect } from "react";

// Define an interface for the initial data props and saved data
interface InterestIncomeProps {
  initialData?: {
    interestSource?: string;
    interestAmount?: string;
    taxRate?: string;
    taxWithheld?: string;
    netInterestIncome?: string;
  };
  onSave?: (data: InterestIncomeData) => void;
}

// Interface for the saved data structure
interface InterestIncomeData {
  interestSource: string;
  interestAmount: string;
  taxRate: string;
  taxWithheld: string;
  netInterestIncome: string;
}

function InterestIncome({ initialData = {}, onSave }: InterestIncomeProps) {
  const [interestSource, setInterestSource] = useState(
    initialData.interestSource || ""
  );
  const [interestAmount, setInterestAmount] = useState(
    initialData.interestAmount || ""
  );
  const [taxRate, setTaxRate] = useState(initialData.taxRate || "");
  const [taxWithheld, setTaxWithheld] = useState(initialData.taxWithheld || "");
  const [netInterestIncome, setNetInterestIncome] = useState(
    initialData.netInterestIncome || ""
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculation effect
  useEffect(() => {
    const calculateTaxWithheld = () => {
      const interestAmountNum = parseFloat(interestAmount) || 0;
      const taxRateNum = parseFloat(taxRate) || 0;

      // Calculate tax withheld
      const calculatedTaxWithheld = interestAmountNum * (taxRateNum / 100);
      setTaxWithheld(calculatedTaxWithheld.toFixed(2));
    };

    const calculateNetInterestIncome = () => {
      const interestAmountNum = parseFloat(interestAmount) || 0;
      const taxWithheldNum = parseFloat(taxWithheld) || 0;

      // Calculate net interest income
      const calculatedNetInterestIncome = interestAmountNum - taxWithheldNum;
      setNetInterestIncome(calculatedNetInterestIncome.toFixed(2));
    };

    calculateTaxWithheld();
    calculateNetInterestIncome();
  }, [interestAmount, taxRate, taxWithheld]);

  // Validation function
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate Interest Source
    if (!interestSource.trim()) {
      newErrors.interestSource = "Interest Source is required";
    }

    // Validate Interest Amount
    if (!interestAmount || parseFloat(interestAmount) < 0) {
      newErrors.interestAmount = "Interest Amount must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // if (!validateFields()) {
    //   return;
    // }

    // Prepare data object
    const interestIncomeData: InterestIncomeData = {
      interestSource,
      interestAmount,
      taxRate,
      taxWithheld,
      netInterestIncome,
    };

    // If onSave prop is provided, call it
    if (onSave) {
      onSave(interestIncomeData);
    } else {
      // Fallback logging if no onSave handler
      console.log("Interest Income Data:", interestIncomeData);
    }
  };

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">Source</h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Bank, Treasury bonds, loans</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <input
              type="text"
              value={interestSource}
              onChange={(e) => setInterestSource(e.target.value)}
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.interestSource ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.interestSource && (
            <p className="text-red-500 text-sm mt-1">{errors.interestSource}</p>
          )}
        </div>
      </div>
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Amount Received
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Total interest earned</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={interestAmount}
              onChange={(e) =>
                setInterestAmount(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.interestAmount ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.interestAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.interestAmount}</p>
          )}
        </div>
      </div>
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

export default InterestIncome;
