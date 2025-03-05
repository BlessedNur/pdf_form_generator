"use client";
import React, { useState, useEffect } from "react";

interface OtherIncomeSourcesData {
  interestIncome: string;
  capitalGains: string;
  salesRevenue: string;
  investmentIncome: string;
  rentalIncome: string;
  otherBusinessIncome: string;
  digitalPlatformIncome: string;
  royalties: string;
  alcoholTobaccoLuxuryItems: string;
  miningRevenue: string;
  waterAbstractionRevenue: string;
  petroleumRevenue: string;
  gamblingRevenue: string;
  carbonEmissionsQuantity: string;
  wasteEmissionQuantity: string;
  totalRevenue: string;
}

interface OtherIncomeSourcesProps {
  initialData?: Partial<OtherIncomeSourcesData>;
  onSave?: (data: OtherIncomeSourcesData) => void;
}

function OtherIncomeSources({
  initialData = {},
  onSave,
}: OtherIncomeSourcesProps) {
  const [incomeData, setIncomeData] = useState<OtherIncomeSourcesData>({
    interestIncome: initialData.interestIncome || "",
    capitalGains: initialData.capitalGains || "",
    salesRevenue: initialData.salesRevenue || "",
    investmentIncome: initialData.investmentIncome || "",
    rentalIncome: initialData.rentalIncome || "",
    otherBusinessIncome: initialData.otherBusinessIncome || "",
    digitalPlatformIncome: initialData.digitalPlatformIncome || "",
    royalties: initialData.royalties || "",
    alcoholTobaccoLuxuryItems: initialData.alcoholTobaccoLuxuryItems || "",
    miningRevenue: initialData.miningRevenue || "",
    waterAbstractionRevenue: initialData.waterAbstractionRevenue || "",
    petroleumRevenue: initialData.petroleumRevenue || "",
    gamblingRevenue: initialData.gamblingRevenue || "",
    carbonEmissionsQuantity: initialData.carbonEmissionsQuantity || "",
    wasteEmissionQuantity: initialData.wasteEmissionQuantity || "",
    totalRevenue: initialData.totalRevenue || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    calculateTotalRevenue();
  }, [
    incomeData.interestIncome,
    incomeData.capitalGains,
    incomeData.salesRevenue,
    incomeData.investmentIncome,
    incomeData.rentalIncome,
    incomeData.otherBusinessIncome,
    incomeData.digitalPlatformIncome,
    incomeData.royalties,
    incomeData.alcoholTobaccoLuxuryItems,
    incomeData.miningRevenue,
    incomeData.waterAbstractionRevenue,
    incomeData.petroleumRevenue,
    incomeData.gamblingRevenue,
  ]);

  const calculateTotalRevenue = () => {
    const incomeFields = [
      "interestIncome",
      "capitalGains",
      "salesRevenue",
      "investmentIncome",
      "rentalIncome",
      "otherBusinessIncome",
      "digitalPlatformIncome",
      "royalties",
      "alcoholTobaccoLuxuryItems",
      "miningRevenue",
      "waterAbstractionRevenue",
      "petroleumRevenue",
      "gamblingRevenue",
    ];

    const total = incomeFields.reduce((sum, field) => {
      return sum + (parseFloat(incomeData[field]) || 0);
    }, 0);

    setIncomeData((prev) => ({
      ...prev,
      totalRevenue: total.toString(),
    }));
  };

  const handleInputChange = (
    field: keyof OtherIncomeSourcesData,
    value: string
  ) => {
    setIncomeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const numericFields: (keyof OtherIncomeSourcesData)[] = [
      "interestIncome",
      "capitalGains",
      "salesRevenue",
      "investmentIncome",
      "rentalIncome",
      "otherBusinessIncome",
      "digitalPlatformIncome",
      "royalties",
      "alcoholTobaccoLuxuryItems",
      "miningRevenue",
      "waterAbstractionRevenue",
      "petroleumRevenue",
      "gamblingRevenue",
    ];

    numericFields.forEach((field) => {
      const value = parseFloat(incomeData[field]);
      if (value && value < 0) {
        newErrors[field] = `${field.replace(
          /([A-Z])/g,
          " $1"
        )} must be a non-negative number`;
      }
    });

    const emissionFields: (keyof OtherIncomeSourcesData)[] = [
      "carbonEmissionsQuantity",
      "wasteEmissionQuantity",
    ];

    emissionFields.forEach((field) => {
      const value = parseFloat(incomeData[field]);
      if (value && (value < 0 || value > 1000000)) {
        newErrors[field] = `Invalid ${field.replace(/([A-Z])/g, " $1")}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // if (!validateFields()) {
    //   return;
    // }

    if (onSave) {
      onSave(incomeData);
    } else {
      console.log("Other Income Sources Data:", incomeData);
    }
  };

  const renderInputField = (
    label: string,
    description: string,
    field: keyof OtherIncomeSourcesData,
    unit: string = "XAF"
  ) => (
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">{description}</i>
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>{unit}</h2>
          <input
            type="text"
            value={incomeData[field]}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9.]/g, "");
              handleInputChange(field, numericValue);
            }}
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              `}
          />
        </div>
       
      </div>
    </div>
  );

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Render all input fields */}
      {renderInputField(
        "Interest Income",
        "Earnings from interest on bank deposits or loans",
        "interestIncome"
      )}
      {renderInputField(
        "Capital Gains",
        "Profits from selling company assets",
        "capitalGains"
      )}
      {renderInputField(
        "Sales Revenue",
        "Additional revenue from selling goods and services",
        "salesRevenue"
      )}
      {renderInputField(
        "Investment Income",
        "Earnings from dividends, stocks, or other investments",
        "investmentIncome"
      )}
      {renderInputField(
        "Rental Income",
        "Money earned from leasing property or equipment",
        "rentalIncome"
      )}
      {renderInputField(
        "Other Business Income",
        "Any other sources of revenue not listed above",
        "otherBusinessIncome"
      )}
      {renderInputField(
        "Digital Platform Income",
        "Earnings from online sales, digital services, or e-commerce",
        "digitalPlatformIncome"
      )}
      {renderInputField(
        "Royalties",
        "Income from intellectual property, patents, or trademarks",
        "royalties"
      )}
      {renderInputField(
        "Alcohol, Tobacco, and Luxury Items",
        "Sales earnings from regulated goods",
        "alcoholTobaccoLuxuryItems"
      )}
      {renderInputField(
        "Mining Revenue",
        "Income from mineral extraction activities",
        "miningRevenue"
      )}
      {renderInputField(
        "Water Abstraction Revenue",
        "Revenue from water extraction and distribution",
        "waterAbstractionRevenue"
      )}
      {renderInputField(
        "Petroleum Revenue",
        "Income from oil and gas operations",
        "petroleumRevenue"
      )}
      {renderInputField(
        "Gambling Revenue",
        "Profits from betting, casinos, and lottery businesses",
        "gamblingRevenue"
      )}
      {renderInputField(
        "Carbon Emissions Quantity",
        "Amount of CO2 emissions for environmental tax",
        "carbonEmissionsQuantity",
        "mt³"
      )}
      {renderInputField(
        "Waste Emission Quantity",
        "Quantity of industrial waste for taxation",
        "wasteEmissionQuantity",
        "mt³"
      )}

      {/* Total Revenue */}
      <div className="border-b-0 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-bold text-gray-800">Total Revenue</h2>
          <p className="text-sm text-gray-600">
            <i>Sum of all income sources</i>
          </p>
        </div>

        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="number"
            value={incomeData.totalRevenue}
            readOnly
            className="bg-[#f2faff] w-[100%] p-4 outline-none font-bold"
          />
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

export default OtherIncomeSources;
