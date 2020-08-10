import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_37iKxhQ8r',
    ClientId:'nv0lu9ojbe14lg4gv1n43192r'
  };

const UserPool = new CognitoUserPool(poolData);

export default UserPool;