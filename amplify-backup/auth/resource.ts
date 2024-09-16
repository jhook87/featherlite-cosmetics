import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';


Amplify.configure(awsconfig);

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
