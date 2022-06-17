import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.USER_POOL_ID || "us-east-1_37iKxhQ8r",
  ClientId: process.env.CLIENT_ID || "nv0lu9ojbe14lg4gv1n43192r",
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
