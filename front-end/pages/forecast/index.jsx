import { useRef, useState } from "react";
import { BsPower } from "react-icons/bs";
import { useDispatch } from "react-redux";

import CreateCustomer from "../../components/CreateCustomer";
import DirectionAndRouteDisplay from "../../components/DirectionAndRouteDisplay";
import EmailAllUser from "../../components/EmailAllUser";
import ForecastForm from "../../components/ForecastForm";
import ForeCastLogoSection from "../../components/ForeCastLogoSection";
import AuthLayout from "../../components/layout/authLayout";
import LoggedInSection from "../../components/LoggedInSection";
import UsersTable from "../../components/UsersTable";
import { logoutUserAction } from "../../store/actions/authActions";

/**
 * @ForeCast - Purpose of this component is
 * let the user to login
 */
const ForeCast = () => {
  const dispatch = useDispatch();
  const myref = useRef();

  const [showSection, setShowSection] = useState("Weather");
  const forecastRightComponent = () => {
    if (showSection === "Weather") {
      return (
        <>
          <LoggedInSection setShowSection={setShowSection} />
          <ForecastForm myref={myref} />
        </>
      );
    }
    if (showSection === "RecentUsers") {
      return <UsersTable showSection={showSection} />;
    }
    if (showSection === "AllUsers") {
      return <UsersTable showSection={showSection} />;
    }
    if (showSection === "CreateCustomer") {
      return <CreateCustomer setShowSection={setShowSection} />;
    }
    if (showSection === "EmailAll") {
      return <EmailAllUser setShowSection={setShowSection} />;
    }
  };

  return (
    <AuthLayout title="Forecast" privateRoute={true}>
      <div className="m-2">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgb(170 218 255), rgba(198, 225, 188, 0.27), rgb(229, 244, 255))",
          }}
          className="flex flex-col flex-col-reverse mb-4 bg-white border rounded-lg shadow sm:flex-row"
        >
          <div className="w-full p-4">
            <a
              onClick={() => {
                dispatch(logoutUserAction());
              }}
              className="flex float-right items-center text-xs font-semibold uppercase"
            >
              <BsPower /> Logout
            </a>
            <ForeCastLogoSection
              setShowSection={setShowSection}
              showSection={showSection}
            />
            {forecastRightComponent()}
          </div>
          <div className="relative w-full ">
            <DirectionAndRouteDisplay ref={myref} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForeCast;
