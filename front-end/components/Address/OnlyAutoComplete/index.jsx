import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, AutoComplete } from "antd";
import { connect } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";
import PropTypes from "prop-types";
import { capitalizeFirstLetter, debounceMethod } from "../../../utils/utils";

const OnlyAutoComplete = (props) => {
  let googleInstance;
  useEffect(() => {
    const loader = new Loader({
      apiKey: "yourAPIkey",
      version: "weekly",
    });

    loader.load().then(() => {
      const google = window.google;
      googleInstance = new google.maps.places.AutocompleteService(null);
    });
  });

  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const { form, type } = props;

  const action = (text) => {
    googleInstance?.getPredictions(
      { input: text },
      // { input: text, componentRestrictions: { country: "us" } },
      (predictions) => setSuggestedAddress(predictions)
    );
  };

  const debounceSearch = React.useCallback(debounceMethod(action, 400), []);

  return (
    <>
      <Row gutter={6} style={{ width: "100%" }}>
        <Col sm={24} md={24}>
          <div className="">
            <>
              <Form.Item
                className="text-left"
                name={`${type}formattedAddress`}
                label={`${capitalizeFirstLetter(type)} Location`}
                colon={false}
                rules={[
                  {
                    required: true,
                    message: `Please enter ${type} address!`,
                  },
                ]}
                initialValue={undefined}
              >
                <AutoComplete
                  id={`${type}-address-autocomplete`}
                  allowClear
                  getPopupContainer={(trigger) => trigger.parentNode}
                  options={
                    suggestedAddress &&
                    suggestedAddress?.map(({ place_id, description }) => ({
                      value: JSON.stringify({
                        id: place_id,
                        description,
                      }),
                      label: description,
                    }))
                  }
                  style={{ width: "100%" }}
                  onSelect={async (e) => {
                    const obj = JSON.parse(e);
                    form.setFieldsValue({
                      [`${type}formattedAddress`]: obj?.description,
                    });
                  }}
                  onSearch={debounceSearch}
                >
                  <Input
                    id={`${type}-autocomplete`}
                    size="large"
                    type="text"
                    placeholder="123 Hill St."
                    autoFocus
                  />
                </AutoComplete>
              </Form.Item>
            </>
          </div>
        </Col>
      </Row>
    </>
  );
};

OnlyAutoComplete.defaultProps = {
  type: "",
};

OnlyAutoComplete.propTypes = {
  /**
   * @form paramType {object}- is the antd form object which shows the ref to parent componet form
   */
  form: PropTypes.object,
  /**
   * @type paramType {string}- is the object which shows the login data after login
   */
  type: PropTypes.string,
  /**
   * @setFieldsValue paramType {func}- is the funtion to set fields value of input
   */
  setFieldsValue: PropTypes.func,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(
  OnlyAutoComplete
);
