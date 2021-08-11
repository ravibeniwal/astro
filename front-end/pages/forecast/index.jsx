import router from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreateCustomer from "../../components/createCustomer";
import DirectionAndRouteDisplay from "../../components/DirectionAndRouteDisplay";
import ForecastForm from "../../components/ForecastForm";
import ForeCastLogoSection from "../../components/ForeCastLogoSection";
import LoggedInSection from "../../components/LoggedInSection";
import UsersTable from "../../components/UsersTable";

/**
 * @ForeCast - Purpose of this component is
 * let the user to login
 */
const ForeCast = () => {
  const isLogin = useSelector((state) => state?.auth?.isLogin);

  const myref = useRef();

  useEffect(() => {
    !isLogin && router.push("/auth/login");
    return () => {};
  }, []);

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
  };

  return (
    <div className="m-2">
      {isLogin && (
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgb(237 237 237),rgb(198 225 188 / 27%),rgb(229 244 255))",
          }}
          className="flex flex-col flex-col-reverse mb-4 bg-white border rounded-lg shadow md:flex-row"
        >
          <div className="w-full p-4">
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
      )}{" "}
    </div>
  );
};

export default ForeCast;
