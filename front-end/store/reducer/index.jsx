import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { foreCastReducer } from "./foreCastReducer";

export default combineReducers({
  auth: authReducer,
  foreCast: foreCastReducer,
});
