import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import awsconfig from '../aws-exports.js';

const s3Client = new S3Client({
    region: awsconfig.aws_project_region,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: awsconfig.aws_project_region }),
        identityPoolId: awsconfig.aws_cognito_identity_pool_id
    })
});

export async function fetchProductsFromS3() {
    const command = new GetObjectCommand({
        Bucket: 'featherlites3',
        Key: 'products.json',
    });

    try {
        const { Body } = await s3Client.send(command);
        const productsJson = await streamToString(Body);
        return JSON.parse(productsJson);
    } catch (error) {
        console.error('Error fetching products from S3:', error);
        throw error;
    }
}

function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}