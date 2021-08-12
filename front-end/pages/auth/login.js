import AuthLayout from "../../components/layout/authLayout";
import Link from "next/link";
import { Form, Row, Card, notification } from "antd";
import { useDispatch } from "react-redux";
import { Button, Input } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import CompanyLogo from "../../components/CompanyLogo";
import { loginUserAction } from "../../store/actions/authActions";
import MessageBar from "../../components/MessageBar";

/**
 * @LoginForm - Purpose of this component is
 * let the user to login
 */

const LoginForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitLogin = (values) => {
    setLoading(true);
    dispatch(
      loginUserAction(values, (res) => {
        setLoading(false);
        if (res?.message === "Login successfull") {
          notification.success({ message: "You logged in successfully" });
        } else {
          res?.status === 409 && setError(res.data?.message);
        }
      })
    );
  };

  return (
    <Row justify="center flex items-center h-full">
      <Card hoverable>
        <AuthLayout title="Sign In">
          <div>
            <CompanyLogo />
            <div className="text-center">
              <h1 className="border-b pb-4">
                The choice of a new generation
                <br />
              </h1>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please sign in to your account
              </p>
            </div>

            <div>
              <div>
                {error && (
                  <div>
                    <MessageBar title="Login Error!" type="error">
                      <div className="text-sm text-gray-700 font-medium">
                        {error}
                      </div>
                    </MessageBar>
                  </div>
                )}
                <div>
                  <Form
                    hideRequiredMark
                    layout="vertical"
                    onFinish={async (values) => {
                      submitLogin(values);
                    }}
                    form={form}
                  >
                    <Form.Item
                      name="email"
                      label="Email"
                      extra="Your registered email address."
                      rules={[
                        {
                          required: true,
                          message: "Email is required",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        type="email"
                        maxLength={256}
                        size="large"
                        autoFocus
                        id="Email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Password is required",
                        },
                      ]}
                    >
                      <Input
                        type="password"
                        maxLength={256}
                        size="large"
                        id="Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        size="large"
                        block
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <div>
                  Don't have an account yet?{" "}
                  <Link className="float-right" href="#">
                    <a href="">Request an account</a>
                  </Link>
                </div>
                <div className="text-center my-4">
                  <a href="/auth/forgotpassword">Forgot password</a>
                </div>
              </div>
              <div>
                <div>© 2021 Astro Assure. All rights reserved.</div>
              </div>
            </div>
          </div>
        </AuthLayout>
      </Card>
    </Row>
  );
};

LoginForm.propTypes = {
  /**
   * @loginData paramType {object}- is the object which shows the login data after login
   */
  loginData: PropTypes.object,
};

export default LoginForm;
