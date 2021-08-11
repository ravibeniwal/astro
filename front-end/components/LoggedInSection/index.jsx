import { Avatar } from "antd";
import { Button } from "antd/lib/radio";
import React from "react";
import PropTypes from "prop-types";
import { getInitials } from "../../utils/utils";
import { useSelector } from "react-redux";

const LoggedInSection = ({ setShowSection }) => {
  const loginData = useSelector((state) => state?.auth?.loginData);

  return (
    <div>
      <div className="flex justify-start py-2 border-b mb-2">
        <div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-white border-2 border-white rounded-full">
              <Avatar src={undefined} className="bg-blue-800" size="large">
                {getInitials(loginData?.data?.email)}
              </Avatar>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase">
                Logged in as {loginData?.data?.role} role
              </div>
              <div className="text-base font-semibold hover:text-blue-800 text-gray-900">
                {loginData?.data?.email}
              </div>
            </div>
          </div>
          {/* Button section for create new customer */}
          <div style={{ padding: "5px" }}>
            <Button
              onClick={() => {
                setShowSection("CreateCustomer");
              }}
              htmlType="submit"
              type="default"
            >
              Create customer
            </Button>
            <Button
              onClick={() => {
                setShowSection("RecentUsers");
              }}
              style={{ marginLeft: "20px" }}
              type="ghost"
            >
              See recent users
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
LoggedInSection.propTypes = {
  /**
   * @setShowSection paramType {object}- is the setState  function from parent component
   */
  setShowSection: PropTypes.func,
};

export default LoggedInSection;
