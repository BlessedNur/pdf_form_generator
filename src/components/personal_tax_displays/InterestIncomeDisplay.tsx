"use client";
import React from "react";

interface InterestIncomeDisplayProps {
  formData: {
    interestSource: string;
    interestAmount: string;
    taxRate: string;
    taxWithheld: string;
    netInterestIncome: string;
  };
}

const InterestIncomeDisplay: React.FC<InterestIncomeDisplayProps> = ({
  formData,
}) => {
  // Function to split string into individual characters for display
  const renderCharacters = (value: string, length: number) => {
    const chars = value.split("").slice(0, length);
    const paddedChars = chars.concat(Array(length - chars.length).fill(""));

    return paddedChars.map((char, index) => (
      <div
        key={index}
        className={`
        w-8 h-10 text-center border-2 border-black 
        border-t-0 outline-none flex items-center justify-center
        ${index !== 0 ? "border-l-0" : ""}
      `}
      >
        {char || "-"}
      </div>
    ));
  };

  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Interest Source */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">Source</h2>
          <p className="text-sm text-gray-600">
            <i>Bank, Treasury bonds, loans</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.interestSource || "N/A"}
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
            <i>Total interest earned</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.interestAmount ? `XAF ${formData.interestAmount}` : "N/A"}
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default InterestIncomeDisplay;
