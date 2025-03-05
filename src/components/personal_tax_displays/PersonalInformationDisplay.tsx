"use client";
import React from "react";

interface PersonalInformationDisplayProps {
  formData: {
    tinValues: string[];
    surnameValues: string[];
    givennameValues: string[];
    dateValues: {
      dd: string;
      mm: string;
      yy: string;
    };
    nationalityValues: string[];
    identification: string;
    indetificaionNumberValues: string[];
    registeredAddress: string;
    telephone: string;
    email: string;
    employmentStatus: string;
    occupation: string;
    sectorValues: string[];
  };
}

const PersonalInformationDisplay: React.FC<PersonalInformationDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* TIN */}
      <div className="flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            1. Taxpayer Identification Number (TIN)
          </h2>
          <p className="text-sm text-gray-600">
            <i>Unique Tax ID issued by tax authorities</i>
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
      {/* Surname */}
      <div className="flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">2. Surname</h2>
          <p className="text-sm text-gray-600">
            <i>Full surname as per identification document</i>
          </p>
        </div>
        <div className="text-base text-gray-700">
          <div className="text-base text-gray-700 whitespace-pre-wrap">
            {formData.surnameValues
              .map((value, index) =>
                value === " " ? " " : value && value.trim() !== "" ? value : ""
              )
              .filter((value) => value !== "")
              .join(" ") || "No surname provided"}
          </div>
        </div>
      </div>

      {/* Given Name */}
      <div className="flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">3. Given Name</h2>
          <p className="text-sm text-gray-600">
            <i>First and middle names as per identification document</i>
          </p>
        </div>
        <div className="text-base text-gray-700 whitespace-pre-wrap">
          {formData.givennameValues
            .map((value, index) =>
              value === " " ? " " : value && value.trim() !== "" ? value : ""
            )
            .filter((value) => value !== "")
            .join(" ") || "No name provided"}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            4. Date of Birth
          </h2>
          <p className="text-sm text-gray-600">
            <i>Date of birth as per identification document</i>
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
                  className={`w-4 h-10 text-center border-t-0 flex items-center justify-center ${
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
                  className={`w-4 h-10 text-center flex items-center justify-center ${
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
                  className={`w-4 h-10 text-center flex items-center justify-center ${
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
      {/* Nationality */}
      <div className="flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            5. Nationality
          </h2>
          <p className="text-sm text-gray-600">
            <i>Country of citizenship</i>
          </p>
        </div>
        <div className="text-base text-gray-700">
          {formData.nationalityValues
            .filter((value) => value && value.trim() !== "")
            .join(" ") || "No nationality specified"}
        </div>
      </div>

      {/* Identification */}
      <div className="border-b-2 border-black flex">
        <div className="flex flex-col p-6 gap-2 w-full">
          <div className="mb-2 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              6. Identification Document
            </h2>
          </div>
          <div className="text-base text-gray-700">
            {formData.identification || "No identification document selected"}
          </div>
        </div>

        <div className="flex flex-col border-l-2 border-black p-6 items-start justify-between gap-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            7. Identification Number
          </h2>
          <div className="flex justify-center">
            {formData.indetificaionNumberValues.map((value, index) => (
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
      </div>

      {/* Residential Address */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            8. Residential Address
          </h2>
          <p className="text-sm text-gray-600">
            <i>Full home address (Street, city, Region)</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.registeredAddress || "N/A"}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex w-full border-b-2 border-black">
        <div className="flex flex-col border-l-0 border-black px-6 items-center py-4 justify-between w-full">
          <div className="mb-2 w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              9. Telephone Number
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-[100%] py-4">{formData.telephone || "N/A"}</div>
          </div>
        </div>
        <div className="flex p-2 flex-col border-l-2 border-black justify-between py-4 px-6 w-full">
          <div className="mb-2 w-full">
            <h2 className="text-lg font-semibold text-gray-800">10. Email</h2>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-[100%] py-4">{formData.email || "N/A"}</div>
          </div>
        </div>
      </div>

      {/* Employment Status */}
      <div className="flex w-full border-b-2 border-black">
        <div className="flex flex-col p-6 gap-2 w-full">
          <div className="mb-2 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              11. Employment Status
            </h2>
          </div>
          <div className="text-base text-gray-700">
            {formData.employmentStatus || "No employment status selected"}
          </div>
        </div>
        <div className="flex p-2 flex-col border-l-2 border-black justify-between py-4 px-6 w-full">
          <div className="mb-2 w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              12. Occupation/Profession
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-[100%] py-4">{formData.occupation || "N/A"}</div>
          </div>
        </div>
      </div>
      {/* Sector */}
      <div className="flex items-center border-b-0 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            13. Sector
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
    </section>
  );
};

export default PersonalInformationDisplay;
