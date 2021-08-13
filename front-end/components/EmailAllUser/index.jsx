import { Form, Row, Card, message } from "antd";
import { Button, Input } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { sendEmailAction } from "../../store/actions/authActions";
import { BsArrowLeft } from "react-icons/bs";

/**
 * @EmailAllUser - Purpose of this component is
 * let the user to login
 */
const EmailAllUser = ({ setShowSection }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const sendEmail = (values) => {
    setLoading(true);
    dispatch(
      sendEmailAction(values, (data) => {
        setLoading(false);

        data?.message === "Email sent to all users" &&
          message.success("Email sent");
      })
    );
  };
  return (
    <div style={{ height: "100%" }} className="flex justify-center">
      <Row justify="center m-auto">
        <Card hoverable>
          <div>
            <div style={{ placeItems: "center" }}>
              <h2 className="mb-4">Send Email to All Users</h2>
              <div>
                <div>
                  <Form
                    hideRequiredMark
                    layout="vertical"
                    onFinish={async (values) => {
                      sendEmail(values);
                    }}
                    form={form}
                  >
                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[
                        {
                          required: true,
                          message: "Subject is required",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        maxLength={256}
                        size="large"
                        autoFocus
                        id="subject"
                      />
                    </Form.Item>
                    <Form.Item
                      name="message"
                      label="Message"
                      rules={[
                        {
                          required: true,
                          message: "Message is required",
                        },
                      ]}
                    >
                      <Input.TextArea size="large" rows={6} id="message" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        size="large"
                        block
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                      >
                        Send
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

EmailAllUser.propTypes = {
  /**
   * @setShowSection paramType {object}- is the setState  function from parent component
   */
  setShowSection: PropTypes.func,
};

export default EmailAllUser;
