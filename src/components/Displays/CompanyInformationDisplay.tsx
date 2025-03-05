"use client";
import React from "react";

interface CompanyInformationDisplayProps {
  formData: {
    companyName: string;
    tinValues: string[];
    brnValues: string[];
    dateValues: {
      dd: string;
      mm: string;
      yy: string;
    };
    legalStructure: string;
    sectorValues: string[];
    registeredAddress: string;
    businessEmail: string;
    businessTelephone: string;
    numberOfEmployees: string;
    annualTurnover: string;
  };
}

const CompanyInformationDisplay: React.FC<CompanyInformationDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Company Name */}
      <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">Company Name</h2>
          <p className="text-sm text-gray-600">
            <i>Full legal name of the company as registered with authorities</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className=" text-end w-[100%] p-4">
            {formData.companyName || "N/A"}
          </div>
        </div>
      </div>

      {/* TIN */}
      <div className="flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Taxpayer Identification Number (TIN)
          </h2>
          <p className="text-sm text-gray-600">
            <i>Unique identifier issued by the Cameroon tax authority</i>
          </p>
        </div>
        <div className="flex justify-center">
          {formData.tinValues.map((value, index) => (
            <div
              key={index}
              className={`
              
                w-6 h-10 text-center 
                border-t-0 outline-none flex items-center justify-center
                ${index !== 0 ? "border-l-0" : ""}
              `}
            >
              {value || "-"}
            </div>
          ))}
        </div>
      </div>

      {/* Business Registration Number */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Business Registration Number
          </h2>
          <p className="text-sm text-gray-600">
            <i>Official registration number from the corporate registry</i>
          </p>
        </div>
        <div className="flex justify-center">
          {formData.brnValues.map((value, index) => (
            <div
              key={index}
              className={`
              w-6 h-10 text-center 
                border-t-0 outline-none flex items-center justify-center
                ${index !== 0 ? "border-l-0" : ""}
              `}
            >
              {value || "-"}
            </div>
          ))}
        </div>
      </div>

      {/* Date of Incorporation */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Date of Incorporation
          </h2>
          <p className="text-sm text-gray-600">
            <i>Date when the business was legally established</i>
          </p>
        </div>
        <div className="flex w-full items-center justify-end space-x-2">
          <div className="flex gap-2 items-center">
            <div>
              <i className="text-lg">DD : </i>
            </div>
            <div className="flex">
              {formData.dateValues.dd.split("").map((value, index) => (
                <div
                  key={`dd-${index}`}
                  className={`w-4  h-10 text-center border-t-0 flex items-center justify-center ${
                    index !== 0 && "border-l-0"
                  }`}
                >
                  {value || "-"}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div>
              <i className="text-lg">MM : </i>
            </div>
            <div className="flex">
              {formData.dateValues.mm.split("").map((value, index) => (
                <div
                  key={`mm-${index}`}
                  className={`w-4 h-10 text-center  flex items-center justify-center ${
                    index !== 0 && "border-l-0"
                  }`}
                >
                  {value || "-"}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div>
              <i className="text-lg">YY : </i>
            </div>
            <div className="flex">
              {formData.dateValues.yy.split("").map((value, index) => (
                <div
                  key={`yy-${index}`}
                  className={`w-4  h-10 text-center flex items-center justify-center ${
                    index !== 0 && "border-l-0"
                  }`}
                >
                  {value || "-"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legal Structure */}
      <div className="flex flex-col border-b-2 border-black p-6 gap-2 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Legal Structure
        </h2>
      </div>
      <div className="text-base text-gray-700">
        {formData.legalStructure || "No legal structure selected"}
      </div>
    </div>

      {/* Sector */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            13. SECTOR
          </h2>
          <p className="text-sm text-gray-600">
            <i>E.g Agriculture, commerce etc ...</i>
          </p>
        </div>
        <div className="flex justify-center">
          {formData.sectorValues.map((value, index) => (
            <div
              key={index} 
              className={`
                w-6 h-10 text-center 
                border-t-0 outline-none flex items-center justify-center
                ${index !== 0 ? "border-l-0" : ""}
              `}
            >
              {value || "-"}
            </div>
          ))}
        </div>
      </div>

      {/* Registered Address */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Registered Address
          </h2>
          <p className="text-sm text-gray-600">
            <i>Official business location</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className=" text-end w-[100%] p-4">
            {formData.registeredAddress || "N/A"}
          </div>
        </div>
      </div>

      {/* Email and Telephone */}
      <div className="flex w-full border-b-2 border-black">
        <div className="flex p-2 flex-col justify-between py-4 px-6 w-full">
          <div className="mb-2 w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              Business Email Address
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <div className=" w-[100%] py-4">
              {formData.businessEmail || "N/A"}
            </div>
          </div>
        </div>
        <div className="flex flex-col border-l-2 border-black px-6 items-center py-4 justify-between w-full">
          <div className="mb-2 w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              Business Telephone Number
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <div className=" w-[100%] py-4">
              {formData.businessTelephone || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Number of Employees */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Number of Employees
          </h2>
          <p className="text-sm text-gray-600">
            <i>Total staff count (full-time & part-time)</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className=" text-end w-[100%] p-4">
            {formData.numberOfEmployees || "N/A"}
          </div>
        </div>
      </div>

      {/* Annual Turnover */}
      <div className="flex items-center border-b-0 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Annual Turnover (XAF)
          </h2>
          <p className="text-sm text-gray-600">
            <i>Total revenue generated in the fiscal year</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.annualTurnover
              ? `XAF  ${formData.annualTurnover
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `
              : "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInformationDisplay;
