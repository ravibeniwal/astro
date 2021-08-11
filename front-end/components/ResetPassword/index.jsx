import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import CompanyLogo from "../CompanyLogo";

const FormItem = Form.Item;

const ResetPassword = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center w-full h-full my-auto">
      <div className="w-full max-w-sm p-4">
        {/* <div className={styles.main}> */}
        <div>
          <CompanyLogo />
          <div className="py-4 text-center">
            <div className="mt-5 text-2xl font-semibold text-black">
              Reset password!
            </div>
          </div>
          <span className="logist-label">Your registered email address</span>
          <Form
            onFinish={(values) => {
              const { email_address, password } = values;
              dispatch({
                type: "resetPassword/reset",
                payload: { email_address, password, invite_token: "shgfjh" },
                callback: (response) => {
                  if (response.status === "ok") {
                    notification.success({
                      message: "Password reset successfully!",
                    });
                    // redirect to login page with email address
                  }
                },
              });
            }}
            // onSubmit={this.handleSubmit}
          >
            <FormItem
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "Invalid email format",
                },
              ]}
              // initialValue={userLoginId}
              name="email_address"
            >
              <Input
                size="large"
                disabled
                placeholder="email"
                style={{ color: "#000" }}
              />
            </FormItem>
            <span className="logist-label">Password</span>
            <FormItem
              name="password"
              rules={[
                {
                  max: 255,
                  min: 6,
                  message: "Your password must be at least 6 characters.",
                },
                {
                  required: true,
                  // validator: this.checkPassword,
                },
              ]}
            >
              <Input.Password
                size="large"
                type="password"
                placeholder="password"
              />
            </FormItem>
            <span className="logist-label">Confirm password</span>
            <FormItem
              name="confirm"
              rules={[
                {
                  required: true,
                  message: "Confirm password is required.",
                },
              ]}
            >
              <Input.Password
                size="large"
                type="password"
                placeholder="Confirm password"
              />
            </FormItem>

            <FormItem>
              <Button
                size="large"
                // loading={submitting}
                style={{ width: "100%" }}
                className="w-full"
                type="primary"
                htmlType="submit"
              >
                <span> Reset password</span>
              </Button>
            </FormItem>
          </Form>
          <div className="flex justify-center w-full mt-2 text-base font-semibold text-orange-600">
            <a onClick={() => {}}>
              <div className="flex">
                <div>Back to login</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
