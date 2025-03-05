"use client";
import React, { useRef, useState } from "react";

interface BusinessIncomeProps {
  initialData?: {
    natureOfBusiness?: string;
    grossAnnualRevenue?: string;
    businessName?: string[];
    businessTin?: string[];
    rentalPayments?: string;
    utilities?: string;
    salaries?: string;
    otherExpenses?: string;
    netBusinessIncome?: string;
  };
  onSave?: (data: BusinessIncomeData) => void;
}

interface BusinessIncomeData {
  natureOfBusiness: string;
  grossAnnualRevenue: string;
  businessName: string;
  businessTin: string;
  rentalPayments: string;
  utilities: string;
  salaries: string;
  otherExpenses: string;
  netBusinessIncome: string;
}

function BusinessIncome({ initialData = {}, onSave }: BusinessIncomeProps) {
  const [natureOfBusiness, setNatureOfBusiness] = useState(
    initialData.natureOfBusiness || ""
  );
  const [grossAnnualRevenue, setGrossAnnualRevenue] = useState(
    initialData.grossAnnualRevenue || ""
  );
  const [rentalPayments, setRentalPayments] = useState(
    initialData.rentalPayments || ""
  );
  const [utilities, setUtilities] = useState(initialData.utilities || "");
  const [salaries, setSalaries] = useState(initialData.salaries || "");
  const [otherExpenses, setOtherExpenses] = useState(
    initialData.otherExpenses || ""
  );
  const [netBusinessIncome, setNetBusinessIncome] = useState(
    initialData.netBusinessIncome || ""
  );

  const [businessName, setBusinessName] = useState(
    initialData.businessName || Array(18).fill("")
  );
  const [businessTin, setBusinessTin] = useState(
    initialData.businessTin || Array(14).fill("")
  );

  const inputRefs = {
    businessName: useRef(Array(18).fill(null)),
    businessTin: useRef(Array(14).fill(null)),
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    const calculateNetBusinessIncome = () => {
      const revenue = parseFloat(grossAnnualRevenue) || 0;
      const rental = parseFloat(rentalPayments) || 0;
      const util = parseFloat(utilities) || 0;
      const salary = parseFloat(salaries) || 0;
      const other = parseFloat(otherExpenses) || 0;

      const totalExpenses = rental + util + salary + other;
      const netIncome = revenue - totalExpenses;

      setNetBusinessIncome(netIncome.toString());
    };

    calculateNetBusinessIncome();
  }, [grossAnnualRevenue, rentalPayments, utilities, salaries, otherExpenses]);

  const createHandleMultiInputChange =
    (setter: any, values: any, refs: any, maxLength) =>
    (index: any, event: any) => {
      const value = event.target.value;

      setter((prevValues: any) => {
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
    (setter: any, values: any, refs: any, maxLength) =>
    (index: any, event: any) => {
      const isBackspace = event.key === "Backspace";
      const value = event.target.value;

      if (isBackspace) {
        setter((prevValues: any) => {
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
    setBusinessTin,
    businessTin,
    inputRefs.businessTin,
    14
  );

  const handleTinKeyDown = createHandleMultiInputKeyDown(
    setBusinessTin,
    businessTin,
    inputRefs.businessTin,
    14
  );

  const handleNameChange = createHandleMultiInputChange(
    setBusinessName,
    businessName,
    inputRefs.businessName,
    18
  );

  const handleNameKeyDown = createHandleMultiInputKeyDown(
    setBusinessName,
    businessName,
    inputRefs.businessName,
    18
  );

  // Validation function
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Add your validation logic here
    if (!natureOfBusiness) {
      newErrors.natureOfBusiness = "Nature of Business is required";
    }

    if (!grossAnnualRevenue || parseFloat(grossAnnualRevenue) < 0) {
      newErrors.grossAnnualRevenue =
        "Gross Annual Revenue must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // if (!validateFields()) {
    //   return;
    // }

    const businessIncomeData: BusinessIncomeData = {
      natureOfBusiness,
      grossAnnualRevenue,
      businessName: businessName.join(""),
      businessTin: businessTin.join(""),
      rentalPayments,
      utilities,
      salaries,
      otherExpenses,
      netBusinessIncome,
    };

    if (onSave) {
      onSave(businessIncomeData);
    } else {
      console.log("Business Income Details:", businessIncomeData);
    }
  };

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
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
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={natureOfBusiness}
            onChange={(e) => setNatureOfBusiness(e.target.value)}
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
            `}
          />
          
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
        <div className="flex justify-center">
          {businessName.map((value: string, index: number) => (
            <input
              key={index}
              ref={(el) => (inputRefs.businessName.current[index] = el)}
              type="text"
              className={`
              bg-[#f2faff]
              w-8 h-10 text-center border-2 border-black 
              border-t-0 outline-none 
              ${index !== 0 ? "border-l-0" : ""}  
            `}
              maxLength={1}
              value={value}
              onChange={(e) => handleNameChange(index, e)}
              onKeyDown={(e) => handleNameKeyDown(index, e)}
            />
          ))}
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
          {businessTin.map((value: string, index: number) => (
            <input
              key={index}
              ref={(el) => (inputRefs.businessTin.current[index] = el)}
              type="text"
              className={`
              bg-[#f2faff]
              w-8 h-10 text-center border-2 border-black 
              border-t-0 outline-none 
              ${index !== 0 ? "border-l-0" : ""}
            `}
              maxLength={1}
              value={value}
              onChange={(e) => handleTinChange(index, e)}
              onKeyDown={(e) => handleTinKeyDown(index, e)}
            />
          ))}
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
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={grossAnnualRevenue}
              onChange={(e) =>
                setGrossAnnualRevenue(e.target.value.replace(/[^0-9.]/g, ""))
              }
              className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              `}
            />
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
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={rentalPayments}
            onChange={(e) =>
              setRentalPayments(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
          />
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
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={utilities}
            onChange={(e) =>
              setUtilities(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
          />
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
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={salaries}
            onChange={(e) =>
              setSalaries(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
          />
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
        <div className="flex items-center gap-1 justify-center w-full">
          <h2>XAF</h2>
          <input
            type="text"
            value={otherExpenses}
            onChange={(e) =>
              setOtherExpenses(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="bg-[#f2faff] w-[100%] p-4 outline-none"
          />
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
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1 justify-center w-full">
            <h2>XAF</h2>
            <input
              type="text"
              value={netBusinessIncome}
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

export default BusinessIncome;
