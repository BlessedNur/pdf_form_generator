"use client";
import React from "react";

// Define the interface for the form data
interface OtherIncomeSourcesDisplayProps {
  formData: {
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
  };
}

const OtherIncomeSourcesDisplay: React.FC<OtherIncomeSourcesDisplayProps> = ({
  formData,
}) => {
  const renderDisplayField = (
    label: string,
    description: string,
    value: string,
    unit: string = "XAF"
  ) => (
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
        <p className="text-sm text-gray-600">
          <i className="text-sm">{description}</i>
        </p>
      </div>
      <div className="flex items-center gap-1 justify-center w-full">
        <div className="text-end w-[100%] p-4">
          {value ? `${unit}  ${value}` : "N/A"}
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Render all display fields */}
      {renderDisplayField(
        "Interest Income",
        "Earnings from interest on bank deposits or loans",
        formData.interestIncome
      )}
      {renderDisplayField(
        "Capital Gains",
        "Profits from selling company assets",
        formData.capitalGains
      )}
      {renderDisplayField(
        "Sales Revenue",
        "Additional revenue from selling goods and services",
        formData.salesRevenue
      )}
      {renderDisplayField(
        "Investment Income",
        "Earnings from dividends, stocks, or other investments",
        formData.investmentIncome
      )}
      {renderDisplayField(
        "Rental Income",
        "Money earned from leasing property or equipment",
        formData.rentalIncome
      )}
      {renderDisplayField(
        "Other Business Income",
        "Any other sources of revenue not listed above",
        formData.otherBusinessIncome
      )}
      {renderDisplayField(
        "Digital Platform Income",
        "Earnings from online sales, digital services, or e-commerce",
        formData.digitalPlatformIncome
      )}
      {renderDisplayField(
        "Royalties",
        "Income from intellectual property, patents, or trademarks",
        formData.royalties
      )}
      {renderDisplayField(
        "Alcohol, Tobacco, and Luxury Items",
        "Sales earnings from regulated goods",
        formData.alcoholTobaccoLuxuryItems
      )}
      {renderDisplayField(
        "Mining Revenue",
        "Income from mineral extraction activities",
        formData.miningRevenue
      )}
      {renderDisplayField(
        "Water Abstraction Revenue",
        "Revenue from water extraction and distribution",
        formData.waterAbstractionRevenue
      )}
      {renderDisplayField(
        "Petroleum Revenue",
        "Income from oil and gas operations",
        formData.petroleumRevenue
      )}
      {renderDisplayField(
        "Gambling Revenue",
        "Profits from betting, casinos, and lottery businesses",
        formData.gamblingRevenue
      )}
      {renderDisplayField(
        "Carbon Emissions Quantity",
        "Amount of CO2 emissions for environmental tax",
        formData.carbonEmissionsQuantity,
        "mt³"
      )}
      {renderDisplayField(
        "Waste Emission Quantity",
        "Quantity of industrial waste for taxation",
        formData.wasteEmissionQuantity,
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
          <div className="text-end w-[100%] p-4 font-bold">
            {formData.totalRevenue
              ? `XAF  ${formData.totalRevenue
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherIncomeSourcesDisplay;
