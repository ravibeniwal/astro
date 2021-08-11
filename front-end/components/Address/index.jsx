/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Select, Button, AutoComplete } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { connect } from "react-redux";
import { Loader } from "@googlemaps/js-api-loader";

const Address = (props) => {
  let googleInstance;
  let map;
  let placesService;
  useEffect(() => {
    const loader = new Loader({
      apiKey: "yourAPIkey",
      version: "weekly",
    });

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(document.getElementById("map"));
      googleInstance = new google.maps.places.AutocompleteService(null, {
        componentRestrictions: { country: "us" },
      });
      placesService = new google.maps.places.PlacesService(map);
    });
  });

  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const {
    form,
    type,
    addressFieldsOptional,
    premountAddress,
    address,
    submit,
    isModal,
    onAddAddress,
    countries,
    showMore,
    showDirection,
    showAskForDetails,
    loadAddress,
    originSelected,
    pageType,
    showAddressSuggestPickupInput,
    dispatch,
  } = props;
  const [moreDetails, setMoreDetails] = useState(showMore);

  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }

  const action = (text) => {
    googleInstance.getPredictions(
      { input: text, componentRestrictions: { country: "au" } },
      (predictions) => setSuggestedAddress(predictions)
    );
  };

  const debounceSearch = React.useCallback(debounce(action, 400), []);
  const { getFieldDecorator } = form;
  const { Option } = Select;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stateAvailable, setStateAvailable] = useState(true);

  const [showDirections, setShowDirections] = useState(showDirection || false);
  // const [countries, setCountries] = useState([]);
  const componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "short_name",
    postal_code: "short_name",
  };

  const getAddressFieldsFromGoogle = async (placeId, cb) => {
    let finalData = {};
    placesService.getDetails({ placeId }, ({ address_components }) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < address_components.length; i++) {
        const addressType = address_components[i].types[0];
        if (componentForm[addressType]) {
          const val = address_components[i][componentForm[addressType]];
          finalData = { ...finalData, [addressType]: val };
        }
        if (address_components.length - 1 === i) {
          cb(finalData);
        }
      }
    });

    // To save the lat and long for calculating the distance on post load-
    // eslint-disable-next-line no-unused-expressions
    placesService?.getDetails({ placeId }, (results) => {
      const payloadDataToSavePickupOrigin = {
        originPlaceId: placeId,
      };
      const payloadDataToSaveDropoffOrigin = {
        destinationPlaceId: placeId,
      };

      // to save the pick up address lat and long to the global state
      if (type === "origin") {
        dispatch({
          type: "load/savePickupOrigin",
          payload: payloadDataToSavePickupOrigin,
        });
      }
      // to save the drop off address lat and long to the global state
      if (type === "destination") {
        dispatch({
          type: "load/saveDropoffOrigin",
          payload: payloadDataToSaveDropoffOrigin,
        });
      }
    });
  };

  const checkRequiredLabel = (labelText, isRequired) => {
    if (isRequired) {
      return (
        <>
          {labelText}
          <span className="text-red-600">* </span>
        </>
      );
    }
    return labelText;
  };

  const country = countries
    ? countries?.find(
        (el) => address && el?.id === address[`${type}CountryCode`]
      )
    : null;

  let foundProvince = "";
  let formattedCountry = "";
  if (country) {
    foundProvince = country.provinces?.find(
      (state) => state.code === address.stateCode
    );
    if (foundProvince && foundProvince.length === 0) {
      setStateAvailable(false);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formattedCountry = `${country.id} ${country.name}`;
  }

  useEffect(() => {
    if (address && address.directions) {
      setShowDirections(true);
    }
    if (!premountAddress && address) {
      const newCountry =
        address &&
        address.country_code &&
        props.countries?.filter((c) => c.id === address?.country_code)[0];
      const province =
        address &&
        newCountry &&
        newCountry?.provinces.find((p) => p.code === address?.stateCode);

      // eslint-disable-next-line no-console

      form.setFieldsValue({
        [`${type}To`]: loadAddress.toName,
        [`${type}Attn`]: loadAddress.attnName,
        [`${type}AddressLine1`]: loadAddress.addressLine1,
        [`${type}AddressLine2`]: loadAddress.addressLine2,
        [`${type}Directions`]: loadAddress.directions,
        [`${type}City`]: loadAddress.city,
        [`${type}StateCode`]:
          loadAddress.countryCode && loadAddress.stateCode
            ? `${province.code}`
            : null,
        [`${type}PostalCode`]: loadAddress.postalCode,
        [`${type}CountryCode`]: loadAddress.countryCode
          ? `${newCountry.id} ${newCountry.name}`
          : "",
      });
    }
  }, [loadAddress]);
  useEffect(() => {
    if (!showAddressSuggestPickupInput) {
      setMoreDetails(!moreDetails);
    }
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <Form hideRequiredMark>
      <Row gutter={6} style={{ width: "100%" }}>
        {showAddressSuggestPickupInput && (
          <>
            <Col sm={24} md={12}>
              <div className="">
                <span className="logist-label">Ask for</span>
                <Form.Item
                  name={`${type}[toName]`}
                  className="text-left"
                  colon={false}
                  initialValue={loadAddress?.toName ? loadAddress?.toName : ""}
                >
                  <Input
                    size="large"
                    type="text"
                    placeholder="John Doe"
                    readOnly={pageType === "Admin"}
                  />
                </Form.Item>
              </div>
            </Col>

            {/* {showAskForDetails && (
              <Col sm={24} md={12}>
                <span className="logist-label">
                  Contact number <span className="font-bold text-red-600">*</span>
                </span>
                <PhoneNumber
                  phoneType={`${type}`}
                  phoneRequired={`${originSelected ? false : props.addressRequired}`}
                  phone={loadAddress?.contact ? loadAddress?.contact : ''}
                  autoFocus={false}
                  label={false}
                  form={form}
                  styles={{ marginTop: '-.5rem', width: '100%' }}
                />
              </Col>
            )} */}
          </>
        )}
      </Row>

      <Row gutter={6} style={{ width: "100%" }}>
        <Col sm={24} md={24}>
          <div className="">
            {showAddressSuggestPickupInput && (
              <>
                <span className="logist-label">
                  <span>
                    {checkRequiredLabel("Address", props.addressRequired)}
                    {addressFieldsOptional ? " " : ""}
                  </span>{" "}
                </span>
                <div className="hidden">
                  <Form.Item
                    name={`${type}[id]`}
                    initialValue={loadAddress ? loadAddress?.id : ""}
                    colon={false}
                    required={false}
                  >
                    <div className="app-phoneview-wrapper app-hide-up-down-arrow-inputnumber">
                      <Input />
                    </div>
                  </Form.Item>
                </div>
                <div className="hidden">
                  <Form.Item
                    name={`${type}[id]`}
                    colon={false}
                    required={false}
                  >
                    <div className="app-phoneview-wrapper app-hide-up-down-arrow-inputnumber">
                      <Input />
                    </div>
                  </Form.Item>
                </div>
                <Form.Item
                  nmae={`${type}[formattedAddress]`}
                  className="text-left"
                  colon={false}
                >
                  <AutoComplete
                    allowClear={pageType !== "Admin"}
                    id={`${type}-address-autocomplete`}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    {...props}
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    dataSource={
                      suggestedAddress &&
                      suggestedAddress?.map(({ place_id, description }) => ({
                        value: JSON.stringify({
                          id: place_id,
                          description,
                        }),
                        text: description,
                      }))
                    }
                    style={{ width: "100%" }}
                    size="large"
                    onSelect={async (e) => {
                      const obj = JSON.parse(e);
                      form.setFieldsValue({
                        [`${type}[formattedAddress]`]: obj?.description,
                      });
                      getAddressFieldsFromGoogle(
                        obj.id,
                        (addressFieldsByGoogle) => {
                          setSelectedCountry(
                            countries
                              ?.filter(
                                (c2) =>
                                  c2.code === addressFieldsByGoogle.country
                              )
                              ?.map((c3) => `${c3.id} ${c3.name}`)[0]
                          );

                          form.setFieldsValue({
                            [`${type}[addressLine1]`]: [
                              addressFieldsByGoogle.street_number,
                              addressFieldsByGoogle.route,
                            ]
                              .filter((text) => text)
                              .join(" "),
                            [`${type}[city]`]: addressFieldsByGoogle.locality,
                            [`${type}[stateCode]`]: countries?.filter(
                              (c1) => c1.code === addressFieldsByGoogle.country
                            ).length
                              ? countries
                                  .filter(
                                    (c2) =>
                                      c2.code === addressFieldsByGoogle.country
                                  )[0]
                                  .provinces.filter(
                                    (p1) =>
                                      p1.code ===
                                      addressFieldsByGoogle.administrative_area_level_1
                                  )
                                  .map((p2) => `${p2.id}`)[0]
                              : "",
                            [`${type}[postalCode]`]:
                              addressFieldsByGoogle.postal_code,
                            [`${type}[countryCode]`]: "AUS",
                          });
                        }
                      );
                    }}
                    onSearch={debounceSearch}
                    readOnly={pageType === "Admin"}
                  >
                    <Input
                      id={`${type}-autocomplete`}
                      size="large"
                      type="text"
                      placeholder="123 Hill St."
                      autofocus
                      readOnly={pageType === "Admin"}
                    />
                  </AutoComplete>
                </Form.Item>
              </>
            )}
          </div>
        </Col>
      </Row>

      <div className={moreDetails ? "visible" : "hidden"}>
        <Row gutter={6} style={{ width: "100%" }}>
          <Col sm={24} md={16}>
            <div className="">
              <span className="logist-label">
                {checkRequiredLabel("Street Address", props.addressRequired)}
                {addressFieldsOptional ? " " : ""}
              </span>
              <Form.Item
                name={`${type}[addressLine1]`}
                className="text-left"
                colon={false}
              >
                <AutoComplete
                  allowClear={pageType !== "Admin"}
                  id={`${type}-address-autocomplete`}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  // {...props}
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  dataSource={
                    suggestedAddress &&
                    suggestedAddress.map(({ place_id, description }) => ({
                      value: JSON.stringify({ id: place_id, description }),
                      text: description,
                    }))
                  }
                  style={{ width: "100%" }}
                  size="large"
                  onSelect={async (e) => {
                    const obj = JSON.parse(e);
                    form.setFieldsValue({
                      [`${type}[formattedAddress]`]: obj?.description,
                    });
                    getAddressFieldsFromGoogle(
                      obj.id,
                      (addressFieldsByGoogle) => {
                        setSelectedCountry(
                          countries
                            ?.filter(
                              (c2) => c2.code === addressFieldsByGoogle.country
                            )
                            .map((c3) => `${c3.id} ${c3.name}`)[0]
                        );
                        form.setFieldsValue({
                          [`${type}[addressLine1]`]: [
                            addressFieldsByGoogle.street_number,
                            addressFieldsByGoogle.route,
                          ]
                            .filter((text) => text)
                            .join(", "),
                          [`${type}[city]`]: addressFieldsByGoogle.locality,
                          [`${type}[stateCode]`]: countries?.filter(
                            (c1) => c1.code === addressFieldsByGoogle.country
                          ).length
                            ? countries
                                .filter(
                                  (c2) =>
                                    c2.code === addressFieldsByGoogle.country
                                )[0]
                                .provinces.filter(
                                  (p1) =>
                                    p1.code ===
                                    addressFieldsByGoogle.administrative_area_level_1
                                )
                                .map((p2) => `${p2.id}`)[0]
                            : "",
                          [`${type}[postalCode]`]:
                            addressFieldsByGoogle.postal_code,
                          [`${type}[countryCode]`]: "AUS",
                        });
                      }
                    );
                  }}
                  onSearch={debounceSearch}
                  onChange={(data) => {
                    if (!data) {
                      form.setFieldsValue({
                        [`${type}[formattedAddress]`]: "",
                        [`${type}[city]`]: "",
                        [`${type}[stateCode]`]: "",
                        [`${type}[postalCode]`]: "",
                      });
                    }
                    // if (!showMore) {
                    //   setMoreDetails(true);
                    // }
                  }}
                  readOnly={pageType === "Admin"}
                >
                  <Input
                    id={`${type}-autocomplete`}
                    size="large"
                    type="text"
                    placeholder="123 Hill St."
                  />
                </AutoComplete>
              </Form.Item>
            </div>
          </Col>
          <Col sm={24} md={8}>
            <div className="">
              <span className="logist-label">Apartment, Level</span>
              <Form.Item
                name={`${type}[addressLine2]`}
                className="text-left"
                colon={false}
              >
                <Input size="large" type="text" placeholder="Room 101" />
              </Form.Item>
            </div>
          </Col>
          {moreDetails && showDirections && (
            <Col sm={24}>
              <div className="">
                <span className="logist-label">
                  {type === "origin" ? "Pickup" : "Delivery"} Instructions
                </span>
                <Form.Item name={`${type}[directions]`} colon={false}>
                  <TextArea
                    showCount
                    rows={3}
                    maxLength={100}
                    placeholder="Any landmarks or special instructions"
                  />
                </Form.Item>
              </div>
            </Col>
          )}
        </Row>

        <Row gutter={6} style={{ width: "100%" }}>
          <Col sm={24} md={8} className="responsive">
            <div className="">
              <span className="logist-label">
                {checkRequiredLabel("Suburb", props.addressRequired)}
                {addressFieldsOptional ? "" : ""}
              </span>
              <Form.Item
                name={`${type}[city]`}
                className="text-left"
                colon={false}
              >
                <Input size="large" type="text" placeholder="" />
              </Form.Item>
            </div>
          </Col>
          <Col sm={24} md={8} className="responsive">
            <div className="">
              <span className="logist-label">
                {checkRequiredLabel("State / Province", props.addressRequired)}
              </span>
              <Form.Item
                name={`${type}[stateCode]`}
                className="text-left"
                colon={false}
              >
                <Select
                  // {...props}
                  showSearch
                  getPopupContainer={(trigger) => trigger?.parentNode}
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select your state"
                  notFoundContent="No states found"
                >
                  {countries?.length > 0 && selectedCountry
                    ? countries
                        ?.filter((c) => c.id === selectedCountry.split(" ")[0])
                        ?.map((state) =>
                          state.provinces.map((province) => (
                            <Option key={province.id} value={`${province.id}`}>
                              ({province.code}) {province.name}
                            </Option>
                          ))
                        )
                    : countries
                        ?.filter((c) => c.id === "AUS")
                        ?.map((state) =>
                          state.provinces.map((province) => (
                            <Option key={province.id} value={`${province.id}`}>
                              ({province.code}) {province.name}
                            </Option>
                          ))
                        )}
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col sm={24} md={8} className="responsive">
            <div className="">
              <span className="logist-label">
                {checkRequiredLabel("Post code", props.addressRequired)}
                {addressFieldsOptional ? "" : ""}
              </span>
              <Form.Item
                name={`${type}[postalCode]`}
                className="text-left"
                colon={false}
              >
                <Input
                  // {...props}
                  autoFocus={false}
                  type="text"
                  maxLength={4}
                  placeholder="1234"
                  size="large"
                  onBlur={(event) => {
                    const { value } = event.target;
                    if (value !== "") {
                      if (value.length === 9) {
                        const formattedPostalCode = [
                          value.substring(0, 5),
                          value.substring(5),
                        ].join("-");
                        form.setFieldsValue({
                          [`${type}[postalCode]`]: formattedPostalCode,
                        });
                      }
                    }
                    form.setFieldsValue({ [`${type}[postalCode]`]: value });
                  }}
                  onInput={(event) => {
                    const { value } = event.target;
                    if (value !== "") {
                      if (value.length === 9) {
                        const formattedPostalCode = [
                          value.substring(0, 5),
                          value.substring(5),
                        ].join("-");
                        form.setFieldsValue({
                          [`${type}[postalCode]`]: formattedPostalCode,
                        });
                      }
                    }
                  }}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <div className="hidden">
          <Row gutter={6} style={{ width: "100%" }}>
            <Col span={12} className="responsive">
              <div className="">
                <span className="logist-label">
                  {checkRequiredLabel("Country", props.addressRequired)}
                </span>
                <Form.Item
                  name={`${type}[countryCode]`}
                  className="text-left"
                  colon={false}
                >
                  <Select
                    showSearch
                    placeholder="Country"
                    tabIndex="-1"
                    size="large"
                  >
                    <Select.Option key="1" value="AUS">
                      (AUS) Australia
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {submit && isModal && (
        <Form.Item>
          <div className="text-right app-form-action-bar">
            <Row type="flex" justify="end">
              <Button
                id={`${type}-address-btn`}
                loading={props.loading}
                type="primary"
                onClick={() => {
                  form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                      onAddAddress(values, (id) => {
                        if (props.afterSubmit) {
                          props.afterSubmit(id);
                        }
                      });
                    }
                  });
                }}
              >
                {props.submitModalText
                  ? props.submitModalText
                  : "Create Address"}
              </Button>
            </Row>
          </div>
        </Form.Item>
      )}
      {submit && !isModal && (
        <Form.Item>
          <div className="text-right app-form-action-bar">
            <Button
              id={`${type}-btn-submit`}
              type="primary"
              onClick={() => {
                form.validateFieldsAndScroll((err, values) => {
                  if (!err) onAddAddress(values);
                });
              }}
            >
              {props.submitModalText ? props.submitModalText : "Create Address"}
            </Button>
          </div>
        </Form.Item>
      )}
    </Form>
  );
};

Address.defaultProps = {
  type: "",
};

const mapStateToProps = (state) => ({
  currentUser: state?.user?.currentUser,
  states: state.user?.states,
  countries: state?.countriesList?.countries,
});

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(Address);
