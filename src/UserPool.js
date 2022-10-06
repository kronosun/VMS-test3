import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.USER_POOL_ID || "eu-west-3_P6XK74lL5",
  ClientId: process.env.CLIENT_ID || "73805ovqp2a54h8utuogpnj9ni",
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
