import React from "react";
import PropTypes from "prop-types";

/**
 * @CompanyLogo - Purpose of this component is
 * to show logo of company with text or without text
 */
const CompanyLogo = ({ classes, onlyLogo }) => (
  <div className={`flex justify-center items-center ${classes || ""}`}>
    <img
      className="mr-2"
      style={{ maxWidth: "200px" }}
      src={onlyLogo ? "" : "/companyLogo/log.png"}
      alt="logo"
    />
  </div>
);
CompanyLogo.propTypes = {
  /**
   * @classes paramType {string}- is the string which paases the extra classes to the component
   */
  classes: PropTypes.string,
  /**
   * @onlyLogo paramType {bool}- is the boolean which shows it's text logo or not
   */
  onlyLogo: PropTypes.bool,
};

export default CompanyLogo;
