"use client";
import React from "react";

interface RentalIncomeDisplayProps {
  formData: {
    propertyLocation: string;
    maintenanceCosts: string;
    grossRentalIncome: string;
    netRentalIncome: string;
  };
}

const RentalIncomeDisplay: React.FC<RentalIncomeDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Property Location */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Property Location
          </h2>
          <p className="text-sm text-gray-600">
            <i>Address of rented property</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.propertyLocation || "N/A"}
          </div>
        </div>
      </div>

      {/* Maintenance Costs */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Maintenance Costs
          </h2>
          <p className="text-sm text-gray-600">
            <i>Repairs, security, utilities</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.maintenanceCosts
              ? `XAF ${formData.maintenanceCosts}`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Gross Rental Income */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Gross Rental Income
          </h2>
          <p className="text-sm text-gray-600">
            <i>Total earnings before costs</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.grossRentalIncome
              ? `XAF ${formData.grossRentalIncome
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Net Rental Income */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Net Rental Income
          </h2>
          <p className="text-sm text-gray-600">
            <i>Gross Income - Maintenance Costs</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4 font-bold">
            {formData.netRentalIncome
              ? `XAF ${formData.netRentalIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalIncomeDisplay;
