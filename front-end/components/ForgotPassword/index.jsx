import { Button, Card, Form, Input, Row } from "antd";
import AuthLayout from "../../components/layout/authLayout";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CompanyLogo from "../CompanyLogo";
import { ArrowRightOutlined } from "@ant-design/icons";
import { sendResetPasswordLinkAction } from "../../store/actions/authActions";
import MessageBar from "../MessageBar";
import Link from "next/link";

const FormItem = Form.Item;
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [passwordRequestSuccess, setPasswordRequestSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setSubmitting(true);
    dispatch(
      sendResetPasswordLinkAction(values, (res) => {
        setSubmitting(false);
        if (res?.status === 409) {
          res?.status === 409 && setError(res.data?.message);
          return;
        }
        res?.message === "Password sent successfully!" &&
          setPasswordRequestSuccess(true);
      })
    );
  };

  return (
    <Row justify="center flex items-center h-full">
      <Card hoverable>
        <AuthLayout title="Forgot Password">
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
                  {error && (
                    <MessageBar title="Reset Error!" type="error">
                      <div className="text-sm text-gray-700 font-medium">
                        {error}
                      </div>
                    </MessageBar>
                  )}
                  <Form
                    className="mt-4"
                    form={form}
                    onFinish={(values) => handleSubmit(values)}
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
                      name="email"
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
              <div className="my-4">
                Remember your password?{" "}
                <Link className="float-right" href="/auth/login">
                  <a href="">Back to Sign in</a>
                </Link>
              </div>
            </div>
          </div>
        </AuthLayout>
      </Card>
    </Row>
  );
};

export default ForgotPassword;
