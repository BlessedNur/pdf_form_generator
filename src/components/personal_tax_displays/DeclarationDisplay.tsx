"use client";
import React from "react";
import Image from "next/image";

interface DeclarationDisplayProps {
  formData: {
    authorizedRepresentativeName: string;
    signature: string;
    dateOfDeclaration: string;
  };
}

const DeclarationDisplay: React.FC<DeclarationDisplayProps> = ({
  formData,
}) => {
  return (
    <section className="max-w-full m-4 border-2mx-auto bg-white">
      {/* Authorized Representative Name */}
      <div className="border-b-0 border-black py-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Name of Declarant
          </h2>
          <p className="text-sm text-gray-600">
            <i>Full legal name of taxpayer</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4">
            {formData.authorizedRepresentativeName || "N/A"}
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="border-b-0 border-black py-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">Signature</h2>
          <p className="text-sm text-gray-600">
            <i>Digital or handwritten signature</i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[100%] py-4 flex justify-end">
            {formData.signature ? (
              <div className="w-40 overflow-hidden">
                <Image
                  src={formData.signature}
                  alt="Signature"
                  width={300}
                  height={200}
                  className="relative -right-10 max-h-[50px] object-cover "
                />
              </div>
            ) : (
              "N/A"
            )}
          </div>
        </div>
      </div>

      {/* Date of Declaration */}
      <div className="border-b-0 border-black py-6 flex items-center justify-between gap-8 w-full">
        <div className="mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-800">
            Date of Declaration
          </h2>
          <p className="text-sm text-gray-600">
            Format: DD/MM/YYYY
            <i></i>
          </p>
        </div>
        <div className="flex justify-center w-full">
          <div className="text-end w-[100%] p-4 font-bold">
            {formData.dateOfDeclaration || "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeclarationDisplay;
