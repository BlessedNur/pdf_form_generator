"use client";
import React from "react";

// Define interface for declaration data
interface DeclarationDisplayProps {
  formData: {
    authorizedRepresentativeName: string;
    positionInCompany: string;
    signature: string;
    dateOfDeclaration: string;
  };
}

const DeclarationDisplay: React.FC<DeclarationDisplayProps> = ({
  formData,
}) => {
  const renderDisplayField = (
    label: string,
    value: string,
    type: "text" | "signature" = "text"
  ) => (
    <div className="py-6 flex items-center justify-between gap-8 w-full">
      <div className="mb-2 w-full">
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
      </div>
      <div className="flex items-center  gap-1 justify-end w-full">
        {type === "signature" ? (
          <div className="text-end w-[100%] flex justify-end ">
            {value ? (
              <img
                src={value}
                alt="Signature"
                className="relative -right-10 max-h-[50px] object-cover "
              />
            ) : (
              "No signature provided"
            )}
          </div>
        ) : (
          <div className="text-end w-[100%] p-4">{value || "N/A"}</div>
        )}
      </div>
    </div>
  );

  return (
    <section className="max-w-full m-4 mx-auto bg-white ">
      {/* Authorized Representative Name */}
      {renderDisplayField(
        "Authorized Representative Name",
        formData.authorizedRepresentativeName
      )}

      {/* Position in Company */}
      {renderDisplayField("Position in Company", formData.positionInCompany)}

      {/* Signature */}
      {renderDisplayField("Signature", formData.signature, "signature")}

      {/* Date of Declaration */}
      {renderDisplayField("Date of Declaration", formData.dateOfDeclaration)}
    </section>
  );
};

export default DeclarationDisplay;
