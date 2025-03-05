"use client";
import React from "react";

interface BusinessIncomeDisplayProps {
  formData: {
    natureOfBusiness: string;
    businessName: string;
    businessTin: string;
    grossAnnualRevenue: string;
    rentalPayments: string;
    utilities: string;
    salaries: string;
    otherExpenses: string;
    netBusinessIncome: string;
  };
}

const BusinessIncomeDisplay: React.FC<BusinessIncomeDisplayProps> = ({
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
        w-8 h-10 text-center 
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
      {/* Nature of Business Activity */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Nature of Business Activity
          </h2>
          <p className="text-sm text-gray-600">
            <i>Specify Type (e.g, Retail, Manufacturing, IT)</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.natureOfBusiness || "N/A"}
          </div>
        </div>
      </div>

      {/* Business Name */}
      <div className="flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Business Name</h2>
          <p className="text-sm text-gray-600">
            <i>Registered name of business</i>
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-base text-gray-700 mr-2">
            {formData.businessName || "No business name provided"}
          </span>
        </div>
      </div>

      {/* Business TIN */}
      <div className="flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Business TIN</h2>
          <p className="text-sm text-gray-600">
            <i>Provide your Business Taxpayer ID</i>
          </p>
        </div>
        <div className="flex justify-center">
          {renderCharacters(formData.businessTin, 14)}
        </div>
      </div>

      {/* Gross Annual Revenue */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Gross Annual Revenue
          </h2>
          <p className="text-sm text-gray-600">
            <i>Total earnings before expenses</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.grossAnnualRevenue
              ? `XAF ${formData.grossAnnualRevenue}`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Expenses Breakdown Section */}
      <div className="border-b-2 border-black p-6 flex-col flex items-center justify-between gap-1 w-full">
        <h2 className="text-lg font-bold text-gray-800">EXPENSES BREAKDOWN</h2>
        <p className="text-sm text-gray-600">
          <i>Business-related costs</i>
        </p>
      </div>

      {/* Rental Payments */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-sm font-semibold text-gray-800">
            <i>Annual rental payments</i>
          </h2>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.rentalPayments ? `XAF ${formData.rentalPayments}` : "N/A"}
          </div>
        </div>
      </div>

      {/* Utilities */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <p className="text-sm font-semibold text-gray-800">
            <i>Utilities</i>
          </p>
          <p className="text-sm text-gray-600">
            <i>Electricity, water, internet bills</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.utilities ? `XAF ${formData.utilities}` : "N/A"}
          </div>
        </div>
      </div>

      {/* Salaries */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <p className="text-sm font-semibold text-gray-800">
            <i>Salaries</i>
          </p>
          <p className="text-sm text-gray-600">
            <i>Wages paid to employees</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.salaries ? `XAF ${formData.salaries}` : "N/A"}
          </div>
        </div>
      </div>

      {/* Other Expenses */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <p className="text-sm font-semibold text-gray-800">
            <i>Other Expenses (Specify)</i>
          </p>
          <p className="text-sm text-gray-600">
            <i>Additional business costs</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.otherExpenses ? `XAF ${formData.otherExpenses}` : "N/A"}
          </div>
        </div>
      </div>

      {/* Net Business Income */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Net Business Income
          </h2>
          <p className="text-sm text-gray-600">
            <i>Gross Revenue - Total Expenses</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4 font-bold">
            {formData.netBusinessIncome
              ? `XAF ${formData.netBusinessIncome
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessIncomeDisplay;
