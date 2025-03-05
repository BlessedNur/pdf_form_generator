"use client";
import React from "react";

interface DividendIncomeDisplayProps {
  formData: {
    payingEntity: string;
    dividendAmount: string;
    taxRate: string;
    taxWithheld: string;
    netDividendIncome: string;
  };
}

const DividendIncomeDisplay: React.FC<DividendIncomeDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Name of Paying Entity */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Name of Paying Entity
          </h2>
          <p className="text-sm text-gray-600">
            <i>Company distributing dividends</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.payingEntity || "N/A"}
          </div>
        </div>
      </div>

      {/* Amount Received */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Amount Received
          </h2>
          <p className="text-sm text-gray-600">
            <i>Total dividends earned</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.dividendAmount ? `XAF ${formData.dividendAmount}` : "N/A"}
          </div>
        </div>
      </div>

      

    </section>
  );
};

export default DividendIncomeDisplay;
