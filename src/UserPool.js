import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.USER_POOL_ID || "eu-west-3_Y15EY2p3g",
  ClientId: process.env.CLIENT_ID || "22beftv0oqmk9qgs4ik3fncoq9",
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
