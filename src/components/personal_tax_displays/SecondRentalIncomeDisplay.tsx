"use client";
import React from "react";

interface SecondRentalIncomeDisplayProps {
  formData: {
    assetDescription: string;
    salePrice: string;
    purchasePrice: string;
    netCapitalGain: string;
  };
}

const SecondRentalIncomeDisplay: React.FC<SecondRentalIncomeDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Asset Description */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Description of Asset Sold
          </h2>
          <p className="text-sm text-gray-600">
            <i>Type of asset (land, shares, art)</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.assetDescription || "N/A"}
          </div>
        </div>
      </div>

      {/* Sale Price */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">Sale Price</h2>
          <p className="text-sm text-gray-600">
            <i>Total amount received</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.salePrice ? `XAF ${formData.salePrice}` : "N/A"}
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
            <i>Initial cost of asset</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.purchasePrice ? `XAF ${formData.purchasePrice}` : "N/A"}
          </div>
        </div>
      </div>

      {/* Net Capital Gain */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Net Capital Gain
          </h2>
          <p className="text-sm text-gray-600">
            <i>Sale Price - Purchase Price</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4 font-bold">
            {formData.netCapitalGain
              ? `XAF ${formData.netCapitalGain
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondRentalIncomeDisplay;
