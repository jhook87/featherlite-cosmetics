import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class AmplifyResourcesStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create an S3 bucket for file storage
        const myBucket = new s3.Bucket(this, 'FeatherliteBucket', {
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        // Create a Lambda function
        const myLambda = new lambda.Function(this, 'FeatherliteFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'), // Assuming the Lambda code is in a directory named 'lambda'
            handler: 'index.handler',
        });

        // Create an API Gateway to expose the Lambda function
        const myApi = new apigateway.LambdaRestApi(this, 'FeatherLiteApi', {
            handler: myLambda,
            proxy: false,
        });

        // Add an API resource and method
        const items = myApi.root.addResource('items');
        items.addMethod('GET'); // GET /items
        items.addMethod('POST'); // POST /items

        // Outputs
        new cdk.CfnOutput(this, 'BucketName', {
            value: myBucket.bucketName,
            description: 'The name of the S3 bucket',
        });

        new cdk.CfnOutput(this, 'ApiUrl', {
            value: myApi.url,
            description: 'The URL of the API Gateway',
        });
    }
}
