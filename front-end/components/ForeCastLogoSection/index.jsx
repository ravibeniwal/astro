import { Button } from "antd/lib/radio";
import React from "react";
import PropTypes from "prop-types";
import CompanyLogo from "../CompanyLogo";
import { BsArrowLeftShort } from "react-icons/bs";

const ForeCastLogoSection = ({ setShowSection, showSection }) => {
  return (
    <div>
      <div
        style={{ justifyContent: "space-between", flexWrap: "wrap" }}
        className="flex py-2 border-b mb-2"
      >
        <CompanyLogo />
        {/* Button section for create new customer */}
        {showSection === "Weather" ? (
          <div style={{ padding: "5px", flexWrap: "wrap" }}>
            <Button
              onClick={() => {
                // setShowSection("CreateCustomer");
              }}
              htmlType="submit"
              type="primary"
            >
              Email all users
            </Button>
            <Button
              onClick={() => {
                setShowSection("AllUsers");
              }}
              style={{ marginLeft: "20px" }}
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
        )}
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
