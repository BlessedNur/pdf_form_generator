"use client";
import React, { useState, useRef, useEffect } from "react";

function PersonalInformation({ initialData = {}, onSave, onClose }) {
  const [tinValues, setTinValues] = useState(
    initialData.tinValues || Array(14).fill("")
  );
  const [brnValues, setBrnValues] = useState(
    initialData.brnValues || Array(14).fill("")
  );
  const [surnameValues, setSurnameValues] = useState(
    initialData.surnameValues || Array(18).fill("")
  );
  const [givennameValues, setGivennameValues] = useState(
    initialData.givennameValues || Array(18).fill("")
  );
  const [nationalityValues, setNationalityValues] = useState(
    initialData.nationalityValues || Array(18).fill("")
  );
  const [indetificaionNumberValues, setIndetificaionNumberValues] = useState(
    initialData.indetificaionNumberValues || Array(16).fill("")
  );
  const [sectorValues, setSectorValues] = useState(
    initialData.sectorValues || Array(16).fill("")
  );
  const [identification, setIdentification] = useState(
    initialData.legalStructure || ""
  );
  const [legalStructure, setLegalStructure] = useState(
    initialData.legalStructure || ""
  );

  const [dateValues, setDateValues] = useState(
    initialData.dateValues || {
      dd: Array(2).fill(""),
      mm: Array(2).fill(""),
      yy: Array(4).fill(""),
    }
  );
  const [registeredAddress, setRegisteredAddress] = useState(
    initialData.registeredAddress || ""
  );
  const [occupation, setOccupation] = useState(initialData.occupation || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [telephone, setTelephone] = useState(initialData.telephone || "");

  const [employmentStatus, setEmploymentStatus] = useState(
    initialData.employmentStatus || ""
  );

  const inputRefs = {
    tin: useRef(initialData?.tinRefs || Array(13).fill(null)),
    surname: useRef(initialData?.surnameRefs || Array(18).fill(null)),
    givenname: useRef(initialData?.givennameRefs || Array(18).fill(null)),
    nationality: useRef(initialData?.nationalityRefs || Array(18).fill(null)),
    indetificaionNumber: useRef(
      initialData?.indetificaionNumberRefs || Array(16).fill(null)
    ),
    sector: useRef(initialData?.sectorRefs || Array(14).fill(null)),
    date: {
      dd: useRef(initialData?.dateRefs?.dd || Array(2).fill(null)),
      mm: useRef(initialData?.dateRefs?.mm || Array(2).fill(null)),
      yy: useRef(initialData?.dateRefs?.yy || Array(4).fill(null)),
    },
  };

  const handleSave = () => {
    const personalData = {
      tinValues,
      surnameValues,
      givennameValues,
      nationalityValues,
      indetificaionNumberValues,
      sectorValues,
      dateValues: {
        dd: dateValues.dd.join(""),
        mm: dateValues.mm.join(""),
        yy: dateValues.yy.join(""),
      },
      registeredAddress,
      email,
      telephone,
      identification,
      occupation,
      employmentStatus,
    };

    console.log(personalData);

    onSave(personalData);
  };

  const createHandleMultiInputChange =
    (setter, values, refs, maxLength) => (index, event) => {
      const value = event.target.value;

      setter((prevValues) => {
        const newValues = [...prevValues];

        if (value.length <= 1) {
          newValues[index] = value;

          if (value.length === 1 && index < maxLength - 1) {
            refs.current[index + 1].focus();
          }
        }

        return newValues;
      });
    };

  const createHandleMultiInputKeyDown =
    (setter, values, refs, maxLength) => (index, event) => {
      const isBackspace = event.key === "Backspace";
      const value = event.target.value;

      if (isBackspace) {
        setter((prevValues) => {
          const newValues = [...prevValues];

          if (value === "") {
            if (index > 0) {
              newValues[index - 1] = "";

              refs.current[index - 1].focus();
            }
          } else {
            newValues[index] = "";
          }

          return newValues;
        });
      }
    };

  const handleTinChange = createHandleMultiInputChange(
    setTinValues,
    tinValues,
    inputRefs.tin,
    14
  );

  const handleTinKeyDown = createHandleMultiInputKeyDown(
    setTinValues,
    tinValues,
    inputRefs.tin,14
  );

  const handleSectorChange = createHandleMultiInputChange(
    setSectorValues,
    sectorValues,
    inputRefs.sector,
    16
  );

  const handleSectorKeyDown = createHandleMultiInputKeyDown(
    setSectorValues,
    sectorValues,
    inputRefs.sector,
    16
  );
  const handleSurnameChange = createHandleMultiInputChange(
    setSurnameValues,
    surnameValues,
    inputRefs.surname,
    18
  );
  const handleSurnameKeyDown = createHandleMultiInputKeyDown(
    setSurnameValues,
    surnameValues,
    inputRefs.surname,
    18
  );
  const handleGivennameChange = createHandleMultiInputChange(
    setGivennameValues,
    givennameValues,
    inputRefs.givenname,
    18
  );
  const handleGivennameKeyDown = createHandleMultiInputKeyDown(
    setGivennameValues,
    givennameValues,
    inputRefs.givenname,
    18
  );
  const handleNationalityChange = createHandleMultiInputChange(
    setNationalityValues,
    nationalityValues,
    inputRefs.nationality,
    18
  );
  const handleNationalityKeyDown = createHandleMultiInputKeyDown(
    setNationalityValues,
    nationalityValues,
    inputRefs.nationality,
    18
  );
  const handleIndetificaionNumberChange = createHandleMultiInputChange(
    setIndetificaionNumberValues,
    indetificaionNumberValues,
    inputRefs.indetificaionNumber,
    16
  );
  const handleIndetificaionNumberKeyDown = createHandleMultiInputKeyDown(
    setIndetificaionNumberValues,
    indetificaionNumberValues,
    inputRefs.indetificaionNumber,
    16
  );
  const handleDateChange = (section, index, event) => {
    const value = event.target.value;

    setDateValues((prev) => {
      const updatedValues = { ...prev };

      if (value.length <= 1) {
        updatedValues[section][index] = value;

        // Modify this part for year section to auto-advance all 4 inputs
        if (section === "yy") {
          if (value.length === 1 && index < 3) {
            inputRefs.date[section].current[index + 1].focus();
          }
        } else {
          // Keep existing logic for dd and mm
          if (value.length === 1 && index < 1) {
            inputRefs.date[section].current[index + 1].focus();
          }
        }
      }

      return updatedValues;
    });
  };

  const handleDateKeyDown = (section, index, event) => {
    const isBackspace = event.key === "Backspace";
    const value = event.target.value;

    if (isBackspace) {
      setDateValues((prev) => {
        const updatedValues = { ...prev };

        if (value === "") {
          if (index > 0) {
            updatedValues[section][index - 1] = "";

            inputRefs.date[section].current[index - 1].focus();
          }
        } else {
          updatedValues[section][index] = "";
        }

        return updatedValues;
      });
    }
  };

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto  bg-white shadow-md">
      {/* TIN */}
      <div className=" flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className=" text-lg font-semibold text-gray-800">
            1. Taxpayer Identification Number (TIN)
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Unique Tax ID issued by tax authorities</i>
          </p>
        </div>
        <div className="flex justify-center ">
          {tinValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.tin.current[index] = el)}
              id={`brn-input-${index}`}
              type="text"
              className={`
                bg-[#f2faff]
                w-8 h-10 text-center border-2 border-black 
                border-t-0 outline-none 
                ${index !== 0 ? "border-l-0" : ""}
              `}
              maxLength="1"
              value={value}
              onChange={(e) => handleTinChange(index, e)}
              onKeyDown={(e) => handleTinKeyDown(index, e)}
            />
          ))}
        </div>
      </div>
      {/* Surname */}
      <div className=" flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className=" text-lg font-semibold text-gray-800">2. Surname </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">skip single space for name seperate names</i>
          </p>
        </div>
        <div className="flex justify-center ">
          {surnameValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.surname.current[index] = el)}
              id={`surname-input-${index}`}
              type="text"
              className={`
                bg-[#f2faff]
                w-8 h-10 text-center border-2 border-black 
                border-t-0 outline-none 
                ${index !== 0 ? "border-l-0" : ""}
              `}
              maxLength="1"
              value={value}
              onChange={(e) => handleSurnameChange(index, e)}
              onKeyDown={(e) => handleSurnameKeyDown(index, e)}
            />
          ))}
        </div>
      </div>
      {/* Given name */}
      <div className=" flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className=" text-lg font-semibold text-gray-800">
            3. Given Name
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">skip single space for name seperate names</i>
          </p>
        </div>
        <div className="flex justify-center ">
          {givennameValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.givenname.current[index] = el)}
              id={`given-input-${index}`}
              type="text"
              className={`
                bg-[#f2faff]
                w-8 h-10 text-center border-2 border-black 
                border-t-0 outline-none 
                ${index !== 0 ? "border-l-0" : ""}
              `}
              maxLength="1"
              value={value}
              onChange={(e) => handleGivennameChange(index, e)}
              onKeyDown={(e) => handleGivennameKeyDown(index, e)}
            />
          ))}
        </div>
      </div>
      {/* Conpany name
      <div className=" border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className=" text-lg font-semibold text-gray-800">Company Name</h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">
              Full legal name of the company as registered with authorities
            </i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
          />
        </div>
      </div> */}

      {/* Date of Incorporation */}
      <div className=" flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className=" text-lg font-semibold text-gray-800">
            4. Date of Birth
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">
              Date when the business was legally established
            </i>
          </p>
        </div>
        <div className="flex w-full items-center justify-center space-x-2">
          <div className="flex gap-2 items-center">
            <div>
              <i className="text-lg">DD</i>
            </div>
            <div className="flex ">
              {dateValues.dd.map((value, index) => (
                <input
                  key={`dd-${index}`}
                  ref={(el) => (inputRefs.date.dd.current[index] = el)}
                  id={`date-dd-input-${index}`}
                  type="text"
                  className={`w-8 bg-[#f2faff] h-10 text-center border-2 border-black border-t-0 outline-none ${
                    index != 0 && "border-l-0"
                  }`}
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleDateChange("dd", index, e)}
                  onKeyDown={(e) => handleDateKeyDown("dd", index, e)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div>
              <i className="text-lg">MM</i>
            </div>

            <div className="flex ">
              {dateValues.mm.map((value, index) => (
                <input
                  key={`mm-${index}`}
                  ref={(el) => (inputRefs.date.mm.current[index] = el)}
                  id={`date-mm-input-${index}`}
                  type="text"
                  className={`w-8 bg-[#f2faff] h-10 text-center border-2 border-black ${
                    index != 0 && "border-l-0"
                  } border-t-0 outline-none`}
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleDateChange("mm", index, e)}
                  onKeyDown={(e) => handleDateKeyDown("mm", index, e)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div>
              <i className="text-lg">YY</i>
            </div>
            <div className="flex ">
              {dateValues.yy.map((value, index) => (
                <input
                  key={`yy-${index}`}
                  ref={(el) => (inputRefs.date.yy.current[index] = el)}
                  id={`date-yy-input-${index}`}
                  type="text"
                  className={`w-8 bg-[#f2faff] h-10 text-center border-2 border-black border-t-0 outline-none ${
                    index != 0 && "border-l-0"
                  }`}
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleDateChange("yy", index, e)}
                  onKeyDown={(e) => handleDateKeyDown("yy", index, e)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className=" flex border-b-2 border-black p-6 items-center justify-between gap-8 w-full">
        <div className="mb-2">
          <h2 className=" text-lg font-semibold text-gray-800">
            5. Nationality
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Country of citizenship</i>
          </p>
        </div>
        <div className="flex justify-center ">
          {nationalityValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.nationality.current[index] = el)}
              id={`nationality-input-${index}`}
              type="text"
              className={`
                bg-[#f2faff]
                w-8 h-10 text-center border-2 border-black 
                border-t-0 outline-none 
                ${index !== 0 ? "border-l-0" : ""}
              `}
              maxLength="1"
              value={value}
              onChange={(e) => handleNationalityChange(index, e)}
              onKeyDown={(e) => handleNationalityKeyDown(index, e)}
            />
          ))}
        </div>
      </div>

      <div className="border-b-2 border-black  flex ">
        <div className=" flex flex-col p-6  gap-2 w-full ">
          <div className="mb-2 w-full">
            <h2 className=" text-lg font-semibold text-gray-800 mb-2">
              6. Identification Document
            </h2>
          </div>
          <div className="flex space-x-4">
            {["ID card", "Passport"].map((structure) => (
              <label key={structure} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="identification"
                  value={structure}
                  checked={identification === structure}
                  onChange={(e) => setIdentification(e.target.value)}
                  className="appearance-none w-5 h-5 border-2 border-black relative
                  checked:bg-white
                  checked:before:content-['✓']
                  checked:before:text-black
                  checked:before:text-sm
                  checked:before:absolute
                  checked:before:top-1/2
                  checked:before:left-1/2
                  checked:before:-translate-x-1/2
                  checked:before:-translate-y-1/2"
                />
                <span>{structure}</span>
              </label>
            ))}
          </div>
        </div>

        <div className=" flex flex-col border-l-2 border-black  p-6 items-start justify-between gap-2 w-full">
          <h2 className=" text-lg font-semibold text-gray-800">
            7. Identification Number
          </h2>

          <div className="flex justify-center ">
            {indetificaionNumberValues.map((value, index) => (
              <input
                key={index}
                ref={(el) =>
                  (inputRefs.indetificaionNumber.current[index] = el)
                }
                id={`IDN-input-${index}`}
                type="text"
                className={`
                bg-[#f2faff]
                w-8 h-10 text-center border-2 border-black 
                border-t-0 outline-none 
                ${index !== 0 ? "border-l-0" : ""}
              `}
                maxLength="1"
                value={value}
                onChange={(e) => handleIndetificaionNumberChange(index, e)}
                onKeyDown={(e) => handleIndetificaionNumberKeyDown(index, e)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center border-b-2 border-black p-6 justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className=" text-lg font-semibold text-gray-800">
            8. Residential Address
          </h2>
          <p className="text-sm text-gray-600">
            <i className="text-sm">Full home address (Street, city, Region)</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <input
            type="text"
            value={registeredAddress}
            onChange={(e) => setRegisteredAddress(e.target.value)}
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
          />
        </div>
      </div>
      {/* Email and Number */}
      <div className="flex  w-full border-b-2 border-black">
        <div className=" flex flex-col border-l-0 border-black px-6 items-center py-4 justify-between w-full">
          <div className="mb-2 w-full">
            <h2 className=" text-lg font-semibold text-gray-800">
              9. Your Telephone Number
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <input
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="bg-[#f2faff] w-[100%] p-4 outline-none"
            />
          </div>
        </div>
        <div className="flex p-2 flex-col border-l-2 border-black justify-between py-4 px-6 w-full">
          <div className="mb-2 w-full">
            <h2 className=" text-lg font-semibold text-gray-800">
              10. Your Email
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f2faff] w-[100%] p-4 outline-none"
            />
          </div>
        </div>{" "}
      </div>
      <div className="flex  w-full border-b-2 border-black">
        <div className=" flex flex-col  p-6 gap-2 min-w-[50%] ">
          <div className="mb-2 w-full">
            <h2 className=" text-lg font-semibold text-gray-800 mb-2">
              11. Employment Status
            </h2>
          </div>
          <div className="flex space-x-4">
            {["Employed", "Self Employed", "unemployed", "Retired"].map(
              (structure) => (
                <label key={structure} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="legalStructure"
                    value={structure}
                    checked={employmentStatus === structure}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    className="appearance-none w-5 h-5 border-2 border-black relative
                checked:bg-white
                checked:before:content-['✓']
                checked:before:text-black
                checked:before:text-sm
                checked:before:absolute
                checked:before:top-1/2
                checked:before:left-1/2
                checked:before:-translate-x-1/2
                checked:before:-translate-y-1/2"
                  />
                  <span className="text-[12px] whitespace-nowrap">
                    {structure}
                  </span>
                </label>
              )
            )}
          </div>
        </div>
        <div className="flex p-2 flex-col border-l-2 border-black justify-between py-4 px-6 w-full">
          <div className="mb-2 w-full">
            <h2 className=" text-lg font-semibold text-gray-800">
              12. Occupation/Profession
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="bg-[#f2faff] w-[100%] p-4 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Sector */}
      <div className=" flex items-center border-b-0 border-black p-6 justify-between gap-8 w-full ">
        <div className="mb-2 w-full">
          <h2 className=" text-lg font-semibold text-gray-800 mb-2">
            13. SECTOR
          </h2>
          <p className="text-sm text-gray-600">
            {" "}
            <i className="text-sm">
              E.g Agriculture, commerce etc ...{" "}
              <span className="text-blue-500 text-sm">
                All business sectors
              </span>
            </i>
          </p>
        </div>
        <div className="flex justify-center ">
          {sectorValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.sector.current[index] = el)}
              id={`sector-input-${index}`}
              type="text"
              className={`
                
                bg-[#f2faff]
                w-8 h-10 text-center border-2 border-black 
                border-t-0 outline-none 
                ${index !== 0 ? "border-l-0" : ""}
              `}
              maxLength="1"
              value={value}
              onChange={(e) => handleSectorChange(index, e)}
              onKeyDown={(e) => handleSectorKeyDown(index, e)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end p-4 space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-700 text-white rounded"
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default PersonalInformation;
