import * as Action from "./types";
import UserPool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { setAlert } from "./alert";
// import axios from 'axios';

// Load User pas web loading
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(getAttributes());
    const user = UserPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        try {
          if (err) console.log("Get Session User Error !");
          console.log("Session Found from loadUser Action: ", session);
          dispatch({
            type: Action.USER_LOADED,
            payload: session.idToken.payload,
          });
        } catch (e) {
          dispatch({
            type: Action.LOADED_FAIL,
          });
        }
      });
    } else {
      console.log("Loaduser: User Not Found");
      dispatch({
        type: Action.LOADED_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: Action.LOADED_FAIL,
    });
    console.error(err);
  }
};

// Login pake Cognito
export const loginCognito = (email, password) => async (dispatch) => {
  const user = new CognitoUser({
    Username: email,
    Pool: UserPool,
  });
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });
  try {
    await user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("Login Success : ", data.idToken.payload.name);
        dispatch(loadUser());
      },
      onFailure: (err) => {
        console.log("Login Failed: ", err);
        dispatch(loadUser());
        dispatch(setAlert("Invalid Credentials !", "danger"));
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
        dispatch(loadUser());
        dispatch(setAlert("Invalid Credentials !", "danger"));
      },
    });
  } catch (error) {
    console.error(error);
  }
};

// Register pake Cognito
export const signupCognito = async (
  email,
  password,
  name,
  gender,
  birthDate,
  address,
  phone,
  profile,
  ektp
) => {
  const addressAttribute = {
    Name: "address",
    Value: address,
  };
  const birthAttribue = {
    Name: "birthdate",
    Value: birthDate,
  };
  const emailAttribute = {
    Name: "email",
    Value: email,
  };
  const genderAttribute = {
    Name: "gender",
    Value: gender,
  };
  const nameAttribute = {
    Name: "name",
    Value: name,
  };
  const phoneAttribute = {
    Name: "phone",
    Value: phone.toString(),
  };
  const adminAttribute = {
    Name: "custom:admin",
    Value: "false",
  };
  const pictureAttribute = {
    Name: "picture",
    Value: ektp,
  };
  const profileAttribute = {
    Name: "profile",
    Value: profile,
  };
  const attributeList = [
    addressAttribute,
    emailAttribute,
    genderAttribute,
    nameAttribute,
    profileAttribute,
    pictureAttribute,
    phoneAttribute,
    birthAttribue,
    adminAttribute,
  ];

  UserPool.signUp(email, password, attributeList, null, (err, data) => {
    if (err) console.log(err);
    console.log("Register Account Success :", data);
  });
};

// Logout

export const logOut = () => async (dispatch) => {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
  dispatch({
    type: Action.LOGOUT,
  });
  console.log("Logout Success !");
};

// get User Attributes

export const getAttributes = () => async (dispatch) => {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.getSession(async (err, session) => {
      if (err) console.error("error : ", err);

      user.getUserAttributes((err, attributes) => {
        try {
          if (err) console.error("getAttributes Error :", err);
          console.log("User Attributes : ", attributes);
          const atri = {
            userId: attributes[0].Value,
            address: attributes[1].Value,
            birthdate: attributes[2].Value,
            phone: attributes[4].Value,
            gender: attributes[5].Value,
            admin: attributes[6].Value === "true",
            profile: attributes[7].Value,
            name: attributes[8].Value,
            email: attributes[9].Value,
            ektp: attributes[10].Value,
          };
          dispatch({
            type: Action.ATTRIBUTES_LOADED,
            payload: atri,
          });
        } catch (e) {
          console.error(e.message);
          dispatch({
            type: Action.LOADED_FAIL,
          });
        }
      });
      //
    });
  }
};
