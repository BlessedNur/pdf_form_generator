"use client";
import React, { useState } from "react";

// Define an interface for the initial data props and saved data
interface IncomeDetailsProps {
  initialData?: {
    grossRevenue?: string;
    purchasePrice?: string;
    costOfProduction?: string;
    totalCOGS?: string;
    grossProfit?: string;
  };
  onSave?: (data: IncomeDetailsData) => void;
}

// Interface for the saved data structure
interface IncomeDetailsData {
  grossRevenue: string;
  purchasePrice: string;
  costOfProduction: string;
  totalCOGS: string;
  grossProfit: string;
}

function IncomeDetails({ initialData = {}, onSave }: IncomeDetailsProps) {
  const [grossRevenue, setGrossRevenue] = useState(
    initialData.grossRevenue || ""
  );
  const [purchasePrice, setPurchasePrice] = useState(
    initialData.purchasePrice || ""
  );
  const [costOfProduction, setCostOfProduction] = useState(
    initialData.costOfProduction || ""
  );
  const [totalCOGS, setTotalCOGS] = useState(initialData.totalCOGS || "");
  const [grossProfit, setGrossProfit] = useState(initialData.grossProfit || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Optional: Add calculation logic
  React.useEffect(() => {
    // Perform calculations if needed
    const calculateTotalCOGS = () => {
      const purchasePriceNum = parseFloat(purchasePrice) || 0;
      const productionCostNum = parseFloat(costOfProduction) || 0;
      const calculatedTotalCOGS = purchasePriceNum + productionCostNum;
      setTotalCOGS(calculatedTotalCOGS.toString());
    };

    const calculateGrossProfit = () => {
      const grossRevenueNum = parseFloat(grossRevenue) || 0;
      const totalCOGSNum = parseFloat(totalCOGS) || 0;
      const calculatedGrossProfit = grossRevenueNum - totalCOGSNum;
      setGrossProfit(calculatedGrossProfit.toString());
    };

    calculateTotalCOGS();
    calculateGrossProfit();
  }, [grossRevenue, purchasePrice, costOfProduction]);

  // Validation function
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate Gross Revenue
    if (!grossRevenue || parseFloat(grossRevenue) < 0) {
      newErrors.grossRevenue = "Gross Revenue must be a positive number";
    }

    // Validate Purchase Price
    if (!purchasePrice || parseFloat(purchasePrice) < 0) {
      newErrors.purchasePrice = "Purchase Price must be a positive number";
    }

    // Validate Cost of Production
    if (!costOfProduction || parseFloat(costOfProduction) < 0) {
      newErrors.costOfProduction =
        "Cost of Production must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save Function
  const handleSave = () => {
    // Validate fields first
    if (!validateFields()) {
      return;
    }

    // Prepare data object
    const incomeDetailsData: IncomeDetailsData = {
      grossRevenue,
      purchasePrice,
      costOfProduction,
      totalCOGS,
      grossProfit,
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
      {/* Gross Revenue (Turnover) */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Gross Revenue (Turnover)
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">
              Total income from the sale of goods/services
            </i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={grossRevenue}
              onChange={(e) =>
                setGrossRevenue(
                  e.target.value.replace(/[^0-9.]/g, "").replace(/[^0-9.]/g, "")
                )
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
                ${errors.grossRevenue ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.grossRevenue && (
            <p className="text-red-500 text-sm mt-1">{errors.grossRevenue}</p>
          )}
        </div>
      </div>

      {/* Similar modifications for other sections with error handling */}
      {/* Purchase Price */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Purchase Price
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Total cost of raw materials and purchases</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={purchasePrice}
              onChange={(e) =>
                setPurchasePrice(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
                ${errors.purchasePrice ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.purchasePrice && (
            <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
          )}
        </div>
      </div>

      {/* Cost of Production */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Cost of Production
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">
              Direct costs of manufacturing or service delivery
            </i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={costOfProduction}
              onChange={(e) =>
                setCostOfProduction(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
                ${errors.costOfProduction ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.costOfProduction && (
            <p className="text-red-500 text-sm mt-1">
              {errors.costOfProduction}
            </p>
          )}
        </div>
      </div>

      {/* Total Cost of Goods Sold (COGS) */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Total Cost of Goods Sold (COGS)
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">
              Sum of purchase price and production costs
            </i>
          </p>
        </div>

        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={totalCOGS}
            onChange={(e) =>
              setTotalCOGS(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
            readOnly // Calculated automatically
          />
        </div>
      </div>

      {/* Gross Profit */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Gross Profit (Revenue - COGS)
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Earnings after deducing direct expenses</i>
          </p>
        </div>

        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={grossProfit}
            onChange={(e) =>
              setGrossProfit(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
            readOnly
          />
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

export default IncomeDetails;
