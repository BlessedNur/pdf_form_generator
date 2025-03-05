"use client";
import React from "react";

// Define the interface for the form data
interface IncomeDetailsDisplayProps {
  formData: {
    grossRevenue: string;
    purchasePrice: string;
    costOfProduction: string;
    totalCOGS: string;
    grossProfit: string;
  };
}

const IncomeDetailsDisplay: React.FC<IncomeDetailsDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
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
        <div className="flex items-center gap-1 justify-center w-full">
          
          <div className=" text-end w-[100%] p-4">
            {formData.grossRevenue ? `XAF  ${formData.grossRevenue}` : "N/A"}
          </div>
        </div>
      </div>

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
        <div className="flex items-center gap-1 justify-center w-full">
          
          <div className=" text-end w-[100%] p-4">
            {formData.purchasePrice ? `XAF  ${formData.purchasePrice}` : "N/A"}
          </div>
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
        <div className="flex items-center gap-1 justify-center w-full">
          
          <div className=" text-end w-[100%] p-4">
            {formData.costOfProduction
              ? `XAF  ${formData.costOfProduction} `
              : "N/A"}
          </div>
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
          
          <div className=" text-end w-[100%] p-4">
            {formData.totalCOGS ? `XAF  ${formData.totalCOGS}` : "N/A"}
          </div>
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
          
          <div className=" text-end w-[100%] p-4">
            {formData.grossProfit ? `XAF  ${formData.grossProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ` : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomeDetailsDisplay;
