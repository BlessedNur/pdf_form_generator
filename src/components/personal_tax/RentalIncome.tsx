"use client";
import React, { useState, useEffect } from "react";

// Define an interface for the initial data props and saved data
interface RentalIncomeProps {
  initialData?: {
    propertyLocation?: string;
    maintenanceCosts?: string;
    grossRentalIncome?: string;
    netRentalIncome?: string;
  };
  onSave?: (data: RentalIncomeData) => void;
}

// Interface for the saved data structure
interface RentalIncomeData {
  propertyLocation: string;
  maintenanceCosts: string;
  grossRentalIncome: string;
  netRentalIncome: string;
}

function RentalIncome({ initialData = {}, onSave }: RentalIncomeProps) {
  // State variables
  const [propertyLocation, setPropertyLocation] = useState(
    initialData.propertyLocation || ""
  );
  const [maintenanceCosts, setMaintenanceCosts] = useState(
    initialData.maintenanceCosts || ""
  );
  const [grossRentalIncome, setGrossRentalIncome] = useState(
    initialData.grossRentalIncome || ""
  );
  const [netRentalIncome, setNetRentalIncome] = useState(
    initialData.netRentalIncome || ""
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculation effect
  useEffect(() => {
    const calculateNetRentalIncome = () => {
      const grossIncomeNum = parseFloat(grossRentalIncome) || 0;
      const maintenanceCostsNum = parseFloat(maintenanceCosts) || 0;

      const calculatedNetIncome = grossIncomeNum - maintenanceCostsNum;
      setNetRentalIncome(calculatedNetIncome.toString());
    };

    calculateNetRentalIncome();
  }, [grossRentalIncome, maintenanceCosts]);

  // Validation function
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate Property Location
    if (!propertyLocation.trim()) {
      newErrors.propertyLocation = "Property Location is required";
    }

    // Validate Gross Rental Income
    if (!grossRentalIncome || parseFloat(grossRentalIncome) < 0) {
      newErrors.grossRentalIncome =
        "Gross Rental Income must be a positive number";
    }

    // Validate Maintenance Costs
    if (!maintenanceCosts || parseFloat(maintenanceCosts) < 0) {
      newErrors.maintenanceCosts =
        "Maintenance Costs must be a non-negative number";
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
    const rentalIncomeData: RentalIncomeData = {
      propertyLocation,
      maintenanceCosts,
      grossRentalIncome,
      netRentalIncome,
    };

    // If onSave prop is provided, call it
    if (onSave) {
      onSave(rentalIncomeData);
    } else {
      // Fallback logging if no onSave handler
      console.log("Rental Income Data:", rentalIncomeData);
    }
  };

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Property Location */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Property Location
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Address of rented property</i>
          </p>
        </div>
        <div className="flex flex-col justify-center w-full">
          <input
            type="text"
            value={propertyLocation}
            onChange={(e) => setPropertyLocation(e.target.value)}
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
            ${errors.propertyLocation ? "border-2 border-red-500" : ""}`}
          />
          {errors.propertyLocation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.propertyLocation}
            </p>
          )}
        </div>
      </div>

      {/* Maintenance Costs */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Maintenance Costs
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Repairs, security, utilities</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={maintenanceCosts}
              onChange={(e) =>
                setMaintenanceCosts(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.maintenanceCosts ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.maintenanceCosts && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maintenanceCosts}
            </p>
          )}
        </div>
      </div>

      {/* Gross Rental Income */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Gross Rental Income
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Total earnings before costs</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={grossRentalIncome}
              onChange={(e) =>
                setGrossRentalIncome(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors.grossRentalIncome ? "border-2 border-red-500" : ""}`}
            />
          </div>
          {errors.grossRentalIncome && (
            <p className="text-red-500 text-sm mt-1">
              {errors.grossRentalIncome}
            </p>
          )}
        </div>
      </div>

      {/* Net Rental Income */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Net Rental Income
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Gross Income - Maintenance Costs</i>
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={netRentalIncome}
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

export default RentalIncome;
