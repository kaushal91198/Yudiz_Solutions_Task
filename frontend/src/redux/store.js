import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userSignupReducer,
  userProfileReducer,
} from "./Reducers/userReducer";


const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userProfileReducer,
});
const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
