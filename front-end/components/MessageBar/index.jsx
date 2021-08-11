import React from "react";
import Icon from "@ant-design/icons";
import classNames from "classnames";
import PropTypes from "prop-types";

const exclamationSvg = () => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    className="w-8 h-8"
  >
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const ExclamationIcon = (props) => (
  <Icon component={exclamationSvg} {...props} />
);

const securitySvg = () => (
  <svg
    x="0px"
    y="0px"
    width="32"
    height="32"
    viewBox="0 0 172 172"
    style={{ fill: "#000000" }}
  >
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <path d="M0,172v-172h172v172z" fill="none" />
      <g>
        <path
          d="M86,151.84375c33.325,-19.75313 53.75,-54.95938 53.75,-94.19687v-20.29063l-53.75,-19.8875l-53.75,19.8875v20.29062c0,39.2375 20.425,74.44375 53.75,94.19688"
          fill="#ffffff"
        />
        <path
          d="M86,155.875c-0.67187,0 -1.47813,-0.13438 -2.01562,-0.5375c-34.9375,-20.69375 -55.76562,-57.24375 -55.76562,-97.69063v-20.29062c0,-1.74688 1.075,-3.225 2.6875,-3.7625l53.75,-19.8875c0.94062,-0.26875 1.88125,-0.26875 2.82187,0l53.61563,19.8875c1.6125,0.5375 2.6875,2.15 2.6875,3.7625v20.29062c0,40.44688 -20.82812,76.99687 -55.76562,97.69063c-0.5375,0.40312 -1.34375,0.5375 -2.01562,0.5375zM36.28125,40.17813v17.46875c0,36.81875 18.54375,70.00938 49.71875,89.49375c31.175,-19.35 49.71875,-52.675 49.71875,-89.49375v-17.46875l-49.71875,-18.40938z"
          fill="#744210"
        />
        <path
          d="M86,136.525c-0.80625,0 -1.74688,-0.26875 -2.41875,-0.80625c-21.36562,-15.72187 -34.9375,-38.96875 -38.43125,-65.17187c-0.26875,-2.15 1.20938,-4.16563 3.49375,-4.56875c2.15,-0.26875 4.16562,1.20937 4.56875,3.49375c3.09063,22.97813 14.64688,43.40313 32.7875,57.78125c21.36563,-16.93125 33.59375,-42.19375 33.59375,-69.74062v-6.18125l-33.59375,-12.3625l-36.28125,13.4375c-2.15,0.80625 -4.43437,-0.26875 -5.24063,-2.41875c-0.80625,-2.15 0.26875,-4.43437 2.41875,-5.24063l37.75938,-13.84063c0.94062,-0.26875 1.88125,-0.26875 2.82187,0l37.625,13.975c1.6125,0.5375 2.6875,2.15 2.6875,3.7625v9.00313c0,31.175 -14.24375,59.6625 -39.2375,78.07188c-0.80625,0.5375 -1.74688,0.80625 -2.55312,0.80625z"
          fill="#ECC94B"
        />
        <g fill="#faca00">
          <path d="M86,34.66875v97.825c23.78437,-17.60313 37.625,-44.88125 37.625,-74.84688v-9.00313z" />
        </g>
      </g>
    </g>
  </svg>
);

const MessageBar = (props) => {
  const { type, title, children } = props;

  const messageTitleClass = classNames(
    "font-medium",
    {
      "text-red-800": type === "error",
    },
    {
      "text-yellow-800": type === "warning",
    }
  );

  const messageIconClass = classNames(
    "mr-2 rounded p-1",
    {
      "text-red-600": type === "error",
    },
    {
      "text-yellow-200": type === "warning",
    }
  );

  const messageTypeClass = classNames(
    "flex rounded p-4 shadow my-4 border-t-2",
    {
      "bg-red-100 border-red-600": type === "error",
    },
    {
      "bg-yellow-100 border-yellow-600": type === "warning",
    }
  );

  const messageIconType = () => {
    switch (type) {
      case "error":
        return <Icon component={ExclamationIcon} />;
      default:
        return <Icon component={securitySvg} />;
    }
  };

  return (
    <div className={messageTypeClass}>
      <div className={messageIconClass}>{messageIconType()}</div>
      <div className="flex-auto">
        <div className={messageTitleClass}>{title}</div>
        {children}
      </div>
    </div>
  );
};
MessageBar.propTypes = {
  /**
   * @type paramType {string}- is string like what type of message its
   */
  type: PropTypes.string,
  /**
   * @children paramType {string}- is string like message component
   */
  children: PropTypes.object,
  /**
   * @title paramType {string}- is string and its title of message
   */
  title: PropTypes.string,
};

export default MessageBar;
