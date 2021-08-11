import { Form, Row, Card, notification } from "antd";
import { Button, Input } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { createCustomerAction } from "../../store/actions/authActions";
import { BsArrowLeft } from "react-icons/bs";

/**
 * @CreateCustomer - Purpose of this component is
 * let the user to login
 */
const CreateCustomer = ({ setShowSection }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const inviteCustomer = (values) => {
    dispatch(
      createCustomerAction(values, (data) => {
        data &&
          notification.success({ message: "Customer created successfully" });
      })
    );
  };
  return (
    <div style={{ height: "100%" }} className="flex justify-center">
      <Row justify="center m-auto">
        <Card hoverable>
          <div>
            <div style={{ placeItems: "center" }}>
              <h2 className="mb-4">Invite Customer!</h2>
              <div>
                <h3>Enter the email address to invite the customer.</h3>

                <div>
                  <Form
                    hideRequiredMark
                    layout="vertical"
                    onFinish={async (values) => {
                      inviteCustomer(values);
                      setLoading(false);
                    }}
                    form={form}
                  >
                    <Form.Item
                      name="email"
                      label="Email"
                      extra="Enter email address."
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
                    <Form.Item>
                      <Button
                        size="large"
                        block
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                      >
                        Invite
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <div>
                  <a
                    className="my-4 flex items-center"
                    onClick={() => {
                      setShowSection("Weather");
                    }}
                  >
                    <BsArrowLeft /> Go back to Forecast
                  </a>
                </div>
              </div>
              <div>
                <div>© 2021 Astro Assure. All rights reserved.</div>
              </div>
            </div>
          </div>
        </Card>
      </Row>
    </div>
  );
};

CreateCustomer.propTypes = {
  /**
   * @setShowSection paramType {object}- is the setState  function from parent component
   */
  setShowSection: PropTypes.func,
};

export default CreateCustomer;
