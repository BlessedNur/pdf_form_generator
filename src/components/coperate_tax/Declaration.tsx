"use client";
import React, { useState, useRef, useEffect } from "react";

// Define interface for declaration data
interface DeclarationData {
  authorizedRepresentativeName: string;
  positionInCompany: string;
  signature: string;
  dateOfDeclaration: string;
}

// Define props interface
interface DeclarationProps {
  initialData?: Partial<DeclarationData>;
  onSave?: (data: DeclarationData) => void;
}

function Declaration({ initialData = {}, onSave }: DeclarationProps) {
  // Refs for signature canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // State for declaration data
  const [declarationData, setDeclarationData] = useState<DeclarationData>({
    authorizedRepresentativeName:
      initialData.authorizedRepresentativeName || "",
    positionInCompany: initialData.positionInCompany || "",
    signature: initialData.signature || "",
    dateOfDeclaration: initialData.dateOfDeclaration || "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Advanced date formatting and validation
  const formatDate = (input: string): string => {
    // Remove non-digit characters
    const digits = input.replace(/\D/g, "");

    // Limit to 8 digits
    const trimmedDigits = digits.slice(0, 8);

    // Format logic
    if (trimmedDigits.length <= 2) {
      return trimmedDigits;
    } else if (trimmedDigits.length <= 4) {
      return `${trimmedDigits.slice(0, 2)}/${trimmedDigits.slice(2)}`;
    } else {
      return `${trimmedDigits.slice(0, 2)}/${trimmedDigits.slice(
        2,
        4
      )}/${trimmedDigits.slice(4)}`;
    }
  };

  // Comprehensive date validation
  const validateDate = (dateString: string): boolean => {
    // Regex for DD/MM/YYYY format
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

    if (!dateRegex.test(dateString)) return false;

    // Additional validation for valid dates
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date <= today
    );
  };

  // Validation function
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate name
    if (!declarationData.authorizedRepresentativeName.trim()) {
      newErrors.authorizedRepresentativeName =
        "Representative name is required";
    }

    // Validate position
    if (!declarationData.positionInCompany.trim()) {
      newErrors.positionInCompany = "Position in company is required";
    }

    // Validate signature (canvas-based)
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const isEmpty = ctx ? isCanvasBlank(canvas) : true;
      if (isEmpty) {
        newErrors.signature = "Signature is required";
      }
    }

    // Validate date
    if (!declarationData.dateOfDeclaration) {
      newErrors.dateOfDeclaration = "Date is required";
    } else if (!validateDate(declarationData.dateOfDeclaration)) {
      newErrors.dateOfDeclaration = "Invalid date format or future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if canvas is blank
  const isCanvasBlank = (canvas: HTMLCanvasElement): boolean => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return true;

    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return pixelData.data.every((channel) => channel === 0);
  };

  // Handle date input
  const handleDateInput = (value: string) => {
    const formattedDate = formatDate(value);
    setDeclarationData((prev) => ({
      ...prev,
      dateOfDeclaration: formattedDate,
    }));
  };
  // Signature drawing methods with touch support
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Handle both mouse and touch events
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Handle both mouse and touch events
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear signature canvas
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Handle Save
  const handleSave = () => {
    // if (!validateFields()) {
    //   return;
    // }

    // Convert canvas to data URL for signature
    const canvas = canvasRef.current;
    const signatureDataUrl = canvas ? canvas.toDataURL() : "";

    const finalData = {
      ...declarationData,
      signature: signatureDataUrl,
    };

    if (onSave) {
      onSave(finalData);
    } else {
      console.log("Declaration Data:", finalData);
    }
  };

  // Render input field with error handling
  const renderInputField = (
    label: string,
    field: keyof DeclarationData,
    type: string = "text",
    description?: string
  ) => (
    <div className="border-b-2 border-black p-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
        {description && (
          <p className="text-sm text-gray-600">
            <i>{description}</i>
          </p>
        )}
      </div>
      <div className="flex flex-col w-full">
        {field === "signature" ? (
          <div>
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className={`border-2 ${
                errors.signature ? "border-red-500" : "border-gray-300"
              } bg-white`}
            />
            <button
              onClick={clearSignature}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Clear Signature
            </button>
          </div>
        ) : field === "dateOfDeclaration" ? (
          <input
            type="text"
            value={declarationData[field]}
            onChange={(e) => handleDateInput(e.target.value)}
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors[field] ? "border-2 border-red-500" : ""}`}
            maxLength={10}
          />
        ) : (
          <input
            type={type}
            value={declarationData[field]}
            onChange={(e) =>
              setDeclarationData((prev) => ({
                ...prev,
                [field]: e.target.value,
              }))
            }
            className={`bg-[#f2faff] w-[100%] p-4 outline-none 
              ${errors[field] ? "border-2 border-red-500" : ""}`}
          />
        )}
        {errors[field] && (
          <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
        )}
      </div>
    </div>
  );

  return (
    <section className="max-w-[930px] m-4 border-2 border-black mx-auto bg-white shadow-md">
      {/* Authorized Representative Name */}
      {renderInputField(
        "Authorized Representative Name",
        "authorizedRepresentativeName"
      )}

      {/* Position in Company */}
      {renderInputField("Position in Company", "positionInCompany")}

      {/* Signature (Draw Only) */}
      {renderInputField("Signature", "signature")}

      {/* Date of Declaration */}
      {renderInputField(
        "Date of Declaration",
        "dateOfDeclaration",
        "text",
        "Format: DD/MM/YYYY"
      )}

      {/* Save Button */}
      <div className="flex justify-end p-4 space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors"
        >
          Save Declaration
        </button>
      </div>
    </section>
  );
}

export default Declaration;
