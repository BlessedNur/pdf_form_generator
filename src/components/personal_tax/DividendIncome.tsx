"use client";
import React, { useState, useEffect } from "react";

// Define an interface for the initial data props and saved data
interface DividendIncomeProps {
  initialData?: {
    payingEntity?: string;
    dividendAmount?: string;
    taxRate?: string;
    taxWithheld?: string;
    netDividendIncome?: string;
  };
  onSave?: (data: DividendIncomeData) => void;
}

// Interface for the saved data structure
interface DividendIncomeData {
  payingEntity: string;
  dividendAmount: string;
  taxRate: string;
  taxWithheld: string;
  netDividendIncome: string;
}

function DividendIncome({ initialData = {}, onSave }: DividendIncomeProps) {
  const [payingEntity, setPayingEntity] = useState(
    initialData.payingEntity || ""
  );
  const [dividendAmount, setDividendAmount] = useState(
    initialData.dividendAmount || ""
  );
  const [taxRate, setTaxRate] = useState(initialData.taxRate || "");
  const [taxWithheld, setTaxWithheld] = useState(initialData.taxWithheld || "");
  const [netDividendIncome, setNetDividendIncome] = useState(
    initialData.netDividendIncome || ""
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculation effect
  useEffect(() => {
    const calculateTaxWithheld = () => {
      const dividendAmountNum = parseFloat(dividendAmount) || 0;
      const taxRateNum = parseFloat(taxRate) || 0;

      // Calculate tax withheld
      const calculatedTaxWithheld = dividendAmountNum * (taxRateNum / 100);
      setTaxWithheld(calculatedTaxWithheld.toFixed(2));
    };

    const calculateNetDividendIncome = () => {
      const dividendAmountNum = parseFloat(dividendAmount) || 0;
      const taxWithheldNum = parseFloat(taxWithheld) || 0;

      // Calculate net dividend income
      const calculatedNetDividendIncome = dividendAmountNum - taxWithheldNum;
      setNetDividendIncome(calculatedNetDividendIncome.toFixed(2));
    };

    calculateTaxWithheld();
    calculateNetDividendIncome();
  }, [dividendAmount, taxRate, taxWithheld]);

  // Validation function
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate Paying Entity
    if (!payingEntity.trim()) {
      newErrors.payingEntity = "Paying Entity is required";
    }

    // Validate Dividend Amount
    if (!dividendAmount || parseFloat(dividendAmount) < 0) {
      newErrors.dividendAmount = "Dividend Amount must be a positive number";
    }

    // Validate Tax Rate
    if (!taxRate || parseFloat(taxRate) < 0 || parseFloat(taxRate) > 100) {
      newErrors.taxRate = "Tax Rate must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save Function
  const handleSave = () => {

    // Prepare data object
    const dividendIncomeData: DividendIncomeData = {
      payingEntity,
      dividendAmount,
      taxRate,
      taxWithheld,
      netDividendIncome,
    };

    // If onSave prop is provided, call it
    if (onSave) {
      onSave(dividendIncomeData);
    } else {
      // Fallback logging if no onSave handler
      console.log("Dividend Income Data:", dividendIncomeData);
    }
  };

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Name of Paying Entity
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Company distributing dividends</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <input
              type="text"
              value={payingEntity}
              onChange={(e) => setPayingEntity(e.target.value)}
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.payingEntity ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.payingEntity && (
            <p className="text-red-500 text-sm mt-1">{errors.payingEntity}</p>
          )}
        </div>
      </div>
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Amount Received
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Total dividends earned</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={dividendAmount}
              onChange={(e) =>
                setDividendAmount(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.dividendAmount ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.dividendAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.dividendAmount}</p>
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

export default DividendIncome;
