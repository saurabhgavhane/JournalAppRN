import {
  RECORDS_FETCHED_FAIL,
  RECORDS_FETCHED_SUCCESSS,
  PROFILE_FETCHED_SUCCESSS,
  PROFILE_FETCHED_FAIL
} from "../utils/constants";
import { AsyncStorage } from "react-native";

export const fetchProfile = token => {
  return dispatch => {
    //dispatch({ type: LOGIN_SUCCESSS });
    console.log("fetchRecords");
    console.log("token", token);

    fetch("http://52.34.207.5:5073/m/fetch/clerk/record", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({
        skip: "0",
        key: "",
        companies: []
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("records response", response);
        dispatch({ type: PROFILE_FETCHED_SUCCESSS, payload: response });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: PROFILE_FETCHED_FAIL, payload: error });
      });
  };
};
