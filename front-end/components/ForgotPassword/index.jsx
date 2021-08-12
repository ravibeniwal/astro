/* eslint-disable */
import { Button, Form, Icon, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyLogo from "../CompanyLogo";
import { ArrowRightOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const { form, login, submitting, location } = props;
  const [passwordRequestSuccess, setPasswordRequestSuccess] = useState(false);

  const handleSubmit = (values) => {
    // dispatch({
    //   type: "login/sendResetPasswordLink",
    //   payload: values,
    // }).then((data) => {
    //   if (data?.status === "ok") {
    //     setPasswordRequestSuccess(true);
    //   }
    // });
  };

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
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
  );

  const handleError = () => {
    const { message, description } = login.resetPasswordLinkError;
    const template = (
      <div className="w-full">
        <div
          className="flex p-4 mb-4 bg-red-100 rounded shadow"
          style={{ backgroundColor: "#fce8e6 !important" }}
        >
          <div className="p-1 mr-2 text-red-700">
            <Icon component={exclamationSvg} />
          </div>
          <div className="flex-auto">
            <div className="text-lg font-semibold text-red-800">{message}</div>
            <div className="text-sm font-medium text-gray-700">
              {description}
            </div>
          </div>
        </div>
      </div>
    );
    return template;
  };

  return (
    <div className={`w-full h-full overflow-y-auto`}>
      <div className="h-screen self-center">
        <div className="flex w-full h-full items-center justify-center my-auto">
          <div className="w-full max-w-sm p-4">
            <CompanyLogo />
            <div>
              {!passwordRequestSuccess ? (
                <>
                  <div className="pb-4 mt-5 text-center">
                    <p className="text-2xl font-semibold  text-black">
                      Did you lose your password ?
                    </p>
                  </div>
                  <div className="error">
                    {/* {login?.resetPasswordLinkError && handleError()} */}
                    {handleError}
                  </div>
                  <Form
                    className="mt-4"
                    onFinish={() => handleSubmit}
                    hideRequiredMark
                    colon={false}
                  >
                    <div className="logist-label">
                      Please enter your email for further instructions
                    </div>
                    <FormItem
                      rules={[
                        {
                          required: true,
                          message: "Email is required.",
                        },
                        {
                          type: "email",
                          message: "Enter valid email address.",
                        },
                      ]}
                      name="email_address"
                      initialValue={location?.state?.email}
                    >
                      <Input autoFocus size="large" placeholder="Email" />
                    </FormItem>
                    <FormItem>
                      <Button
                        size="large"
                        block
                        type="primary"
                        loading={submitting}
                        htmlType="submit"
                      >
                        Send reset instructions
                        <ArrowRightOutlined />
                      </Button>
                    </FormItem>
                  </Form>
                </>
              ) : (
                <div className="font-medium mt-10 w-full  mb-4">
                  {" "}
                  An email with password has been sent to your email address.
                  <br />
                  <br />
                  Get the password in the email to login and get back into your
                  account.
                </div>
              )}
              <p className="mt-3 mb-2 text-base font-semibold text-center text-gray-900">
                Remember your password?{" "}
                <a
                  href="/auth/login"
                  className="text-orange-600 visited:text-blue-800"
                >
                  Back to Sign in
                </a>
              </p>
              <div className="w-full text-base font-semibold text-center mt-2 ">
                <a
                  href="/auth/login"
                  className="text-orange-600 visited:text-blue-800"
                >
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
