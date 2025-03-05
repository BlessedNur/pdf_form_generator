import React from "react";
import CompanyInformation from "../../components/coperate_tax/CompanyInformation";
// import IncomeDetails from "../../components/coperate_tax/IncomeDetails";
import IncomeDetails from "../../components/personal_tax/IncomeDetails";
import BusinessIncome from "../../components/personal_tax/BusinessIncome";
import OtherIncomeSources from "../../components/coperate_tax/OtherSources";
import Expenses from "../../components/coperate_tax/Expenses";
import Declaration from "../../components/coperate_tax/Declaration";
import FormDisplay from "../../components/FormDisplay";
import PersonalInformation from "../../components/personal_tax/PersonalInformation";
function page() {
  return (
    <div>
      {/* <CompanyInformation /> */}
      {/* <IncomeDetails /> */}
      {/* <OtherIncomeSources /> */}
      {/* <Expenses/> */}
      {/* <Declaration/> */}
      {/* <FormDisplay/> */}
      {/* <PersonalInformation /> */}
      {/* <IncomeDetails/> */}
      <BusinessIncome />
    </div>
  );
}

export default page;
