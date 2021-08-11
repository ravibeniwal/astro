import {
  Button,
  Form,
  Select,
  Radio,
  DatePicker,
  Row,
  Col,
  notification,
} from "antd";
import { dateFormat } from "../../utils/utils";
import OnlyAutoComplete from "../Address/OnlyAutoComplete";
import PropTypes from "prop-types";
import WeatherDisplay from "../WeatherDisplay";
import moment from "moment";
import { BsGeoAlt } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addRouteAction,
  getForecastRoutesAction,
} from "../../store/actions/foreCastActions";
import { useEffect } from "react";
import { useState } from "react";

const { Option } = Select;

/**
 * @ForecastForm - Purpose of this component is
 * let the user to submit the route for shipment
 */
const ForecastForm = (props) => {
  const loginData = useSelector((state) => state.auth.loginData);

  const [savedRoutesData, setSavedRoutesData] = useState([]);

  const dispatch = useDispatch();
  const { myref } = props;
  const [form] = Form.useForm();

  const saveRoute = () => {
    const values = form.getFieldsValue();
    values.email = loginData.email || "ravibeniwal35@gmail.com";
    dispatch(
      addRouteAction(values, (data) => {
        fetchRoutes();
        data && notification.success({ message: "Route saved successfully" });
      })
    );
  };
  const fetchRoutes = () => {
    dispatch(
      getForecastRoutesAction(
        { email: "ravibeniwal35@gmail.com" },
        (_routes) => {
          console.log("Fetch route data is here", _routes);
          setSavedRoutesData(_routes);
          _routes && notification.success({ message: "All Routes fetched" });
        }
      )
    );
  };

  useEffect(() => {
    fetchRoutes();
    return () => {};
  }, []);

  const handleFormSubmission = (values) => {
    if (myref.current) {
      myref.current.calculateAndDisplayRoute(values);
    }
  };

  return (
    <>
      {/* Search Route Form */}
      <div className="border-b mb-4">
        <Form
          name="forecastForm"
          layout="vertical"
          form={form}
          onFinish={(values) => {
            // Update the google map on submit the route
            handleFormSubmission(values);
          }}
        >
          <div className="border-b mb-2">
            <Form.Item name="favoriteRoute" label="Favorite Route">
              <Select
                showSearch
                // size="large"
                autoFocus
                id="forecastRoute"
                optionFilterProp="children"
                onSelect={async (e) => {
                  const obj = JSON.parse(e);
                  delete obj["shippingDate"];
                  form.setFieldsValue(obj);
                  handleFormSubmission(obj);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {savedRoutesData?.map((route, key) => (
                  <Option
                    key={key}
                    value={JSON.stringify(route)}
                  >{`${route?.originformattedAddress} -> ${route?.destinationformattedAddress} (${route?.estimatedTransitTime} days)`}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>
            <Row gutter={12}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <BsGeoAlt className="text-green-400" />
                <OnlyAutoComplete type="origin" form={form} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <BsGeoAlt className="text-red-400" />{" "}
                <OnlyAutoComplete type="destination" form={form} />
              </Col>
            </Row>

            <Row gutter={12}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  name="shippingDate"
                  label="Ship Date"
                  initialValue={moment()}
                >
                  <DatePicker
                    format={dateFormat}
                    size="large"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  name="estimatedTransitTime"
                  label="Estimated Transit Time"
                  initialValue={4}
                >
                  <Select
                    showSearch
                    size="large"
                    id="estimatedTransitTime"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    <Option value={2}>2 Day</Option>
                    <Option value={3}>3 Day</Option>
                    <Option value={4}>4 Day</Option>
                    <Option value={5}>5 Day</Option>
                    <Option value={6}>6 Day</Option>
                    <Option value={7}>7 Day</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="shipmentGoingThroughChicago"
              label="Shipment going through Chicago"
              initialValue="no"
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <div className="my-4">
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
              <Button
                onClick={() => saveRoute()}
                style={{ marginLeft: "20px" }}
              >
                Save route
              </Button>
            </div>
          </div>
        </Form>
      </div>

      {/* Show weather section */}
      <WeatherDisplay shippingDate={form.getFieldValue("shippingDate")} />
    </>
  );
};

ForecastForm.propTypes = {
  /**
   * @myref paramType {object}- is the object which is ref from map component
   */
  myref: PropTypes.object,
};

export default ForecastForm;
