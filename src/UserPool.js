import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.USER_POOL_ID || "eu-west-3_Y15EY2p3g",
  ClientId: process.env.CLIENT_ID || "or9ndlmo0kth4qv551h062cs",
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
