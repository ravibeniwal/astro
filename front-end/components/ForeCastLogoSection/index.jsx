import { Button } from "antd";
import React from "react";
import PropTypes from "prop-types";
import CompanyLogo from "../CompanyLogo";
import { BsArrowLeftShort } from "react-icons/bs";
import { useSelector } from "react-redux";

const ForeCastLogoSection = ({ setShowSection, showSection }) => {
  const loginData = useSelector((state) => state?.auth?.loginData?.data);
  return (
    <div>
      <div
        style={{ justifyContent: "space-between", flexWrap: "wrap" }}
        className="flex py-2 border-b mb-2"
      >
        <CompanyLogo />
        {/* Button section for create new customer only for admin */}
        {loginData?.role === "Admin" &&
          (showSection === "Weather" ? (
            <div className="flex flex-wrap sm:flex-nowrap p-3">
              <Button
                onClick={() => {
                  setShowSection("EmailAll");
                }}
                className="mr-1 my-2 sm:my-0"
                htmlType="submit"
                type="primary"
              >
                Email all users
              </Button>
              <Button
                className=" mr-1 ml-0 sm:ml-6 my-2 sm:my-0"
                onClick={() => {
                  setShowSection("AllUsers");
                }}
                type="primary"
              >
                See all users
              </Button>
            </div>
          ) : (
            <div>
              <a
                className="my-4 flex items-center"
                onClick={() => {
                  setShowSection("Weather");
                }}
              >
                <BsArrowLeftShort /> Go back to Forecast
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};
ForeCastLogoSection.propTypes = {
  /**
   * @setShowSection paramType {func}- is the setState  function from parent component
   */
  setShowSection: PropTypes.func,
  /**
   * @showSection paramType {string}- is the state  from parent component for displaying section in forecast page
   */
  showSection: PropTypes.string,
};

export default ForeCastLogoSection;
