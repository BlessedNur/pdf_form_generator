"use client";
import React, { useState, useEffect } from "react";

// Define an interface for the initial data props and saved data
interface SecondRentalIncomeProps {
  initialData?: {
    assetDescription?: string;
    salePrice?: string;
    purchasePrice?: string;
    netCapitalGain?: string;
  };
  onSave?: (data: SecondRentalIncomeData) => void;
}

// Interface for the saved data structure
interface SecondRentalIncomeData {
  assetDescription: string;
  salePrice: string;
  purchasePrice: string;
  netCapitalGain: string;
}

function SecondRentalIncome({
  initialData = {},
  onSave,
}: SecondRentalIncomeProps) {
  // State variables
  const [assetDescription, setAssetDescription] = useState(
    initialData.assetDescription || ""
  );
  const [salePrice, setSalePrice] = useState(initialData.salePrice || "");
  const [purchasePrice, setPurchasePrice] = useState(
    initialData.purchasePrice || ""
  );
  const [netCapitalGain, setNetCapitalGain] = useState(
    initialData.netCapitalGain || ""
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculation effect
  useEffect(() => {
    const calculateNetCapitalGain = () => {
      const salePriceNum = parseFloat(salePrice) || 0;
      const purchasePriceNum = parseFloat(purchasePrice) || 0;

      const calculatedNetCapitalGain = salePriceNum - purchasePriceNum;
      setNetCapitalGain(calculatedNetCapitalGain.toString());
    };

    calculateNetCapitalGain();
  }, [salePrice, purchasePrice]);

  // Validation function
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate Asset Description
    if (!assetDescription.trim()) {
      newErrors.assetDescription = "Asset Description is required";
    }

    // Validate Sale Price
    if (!salePrice || parseFloat(salePrice) < 0) {
      newErrors.salePrice = "Sale Price must be a positive number";
    }

    // Validate Purchase Price
    if (!purchasePrice || parseFloat(purchasePrice) < 0) {
      newErrors.purchasePrice = "Purchase Price must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save Function
  const handleSave = () => {
    // Validate fields first
    // if (!validateFields()) {
    //   return;
    // }

    // Prepare data object
    const secondRentalIncomeData: SecondRentalIncomeData = {
      assetDescription,
      salePrice,
      purchasePrice,
      netCapitalGain,
    };

    // If onSave prop is provided, call it
    if (onSave) {
      onSave(secondRentalIncomeData);
    } else {
      // Fallback logging if no onSave handler
      console.log("Second Rental Income Data:", secondRentalIncomeData);
    }
  };

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Asset Description */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Description of Asset Sold
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Type of asset (land, shares, art)</i>
          </p>
        </div>
        <div className="flex flex-col justify-center w-full">
          <input
            type="text"
            value={assetDescription}
            onChange={(e) => setAssetDescription(e.target.value)}
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
            ${errors.assetDescription ? "border-2 border-red-500" : ""}`}
          />
          {errors.assetDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.assetDescription}
            </p>
          )}
        </div>
      </div>

      {/* Sale Price */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">Sale Price</h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Total amount received</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={salePrice}
              onChange={(e) =>
                setSalePrice(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.salePrice ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.salePrice && (
            <p className="text-red-500 text-sm mt-1">{errors.salePrice}</p>
          )}
        </div>
      </div>

      {/* Purchase Price */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Purchase Price
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Initial cost of asset</i>
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

      {/* Net Capital Gain */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Net Capital Gain
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Sale Price - Purchase Price</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={netCapitalGain}
              readOnly
              className="bg-[#f2faff] w-[100%] p-4 outline-none font-bold"
            />
          </div>
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

export default SecondRentalIncome;
