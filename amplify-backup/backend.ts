import { defineBackend } from '@aws-amplify/backend';
import * as cdk from 'aws-cdk-lib';
import { auth } from './auth/resource';
import { AmplifyResourcesStack } from './data/resource';

// Create a CDK app
const app = new cdk.App();

// Create the AmplifyResourcesStack
const data = new AmplifyResourcesStack(app, 'AmplifyResourcesStack', {
    /* If you need to pass any StackProps, you can do so here */
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
    // You can add more props here if needed, such as:
    // bucketName: 'my-custom-bucket-name',
    // lambdaCodePath: 'path/to/lambda/code',
});

// Define the backend
defineBackend({
    auth,
    data,
});

// Synthesize the CloudFormation template
app.synth();