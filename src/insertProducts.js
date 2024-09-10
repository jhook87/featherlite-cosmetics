import fs from 'fs';
import csv from 'csv-parser';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports.js';
import { DataStore } from '@aws-amplify/datastore';
import { Product } from './models/index.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';

// Configure Amplify
Amplify.configure(awsconfig);

// Initialize S3 client using v3
const s3Client = new S3Client({
    region: awsconfig.aws_project_region,
    credentials: fromIni({ profile: 'featherlite' })
});

// Updated downloadCSVFromS3 function
const downloadCSVFromS3 = async (bucket, key, localPath) => {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    });

    const { Body } = await s3Client.send(command);
    const writeStream = fs.createWriteStream(localPath);

    return new Promise((resolve, reject) => {
        Body.pipe(writeStream);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
};

// Function to insert product data into DynamoDB/DataStore
const insertProducts = async (products) => {
    for (const product of products) {
        try {
            await DataStore.save(
                new Product({
                    SKU: product.SKU,
                    ColorDescription: product.ColorDescription,
                    ProductDetails: product.ProductDetails,
                    ProductSize: product.ProductSize,
                    ProductCategory: product.ProductCategory,
                    RetailPrice: product.RetailPrice,
                    SubscriptionPrice: product.SubscriptionPrice,
                    ProductDescription: product.ProductDescription,
                })
            );
            console.log(`Inserted product with SKU: ${product.SKU}`);
        } catch (error) {
            console.error(`Failed to insert product with SKU: ${product.SKU}`, error);
        }
    }
};

// Function to load products from CSV and insert them into DynamoDB
const loadProductsFromCSV = async (filePath) => {
    const products = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                products.push({
                    SKU: row.SKU,
                    ColorDescription: row.ColorDescription,
                    ProductDetails: row.ProductDetails,
                    ProductSize: parseFloat(row.ProductSize),
                    ProductCategory: row.ProductCategory,
                    RetailPrice: parseFloat(row.RetailPrice),
                    SubscriptionPrice: parseFloat(row.SubscriptionPrice),
                    ProductDescription: row.ProductDescription,
                });
            })
            .on('end', async () => {
                console.log(`Parsed ${products.length} products from CSV.`);
                try {
                    await insertProducts(products);
                    console.log('All products inserted successfully.');
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject);
    });
};

// Main function to handle the process
const main = async () => {
    const bucketName = 'featherlites3';
    const csvKey = 'ProductList - Sheet1 (1).csv';
    const localFilePath = './ProductList.csv';

    try {
        console.log(`Downloading CSV from S3: s3://${bucketName}/${csvKey}`);
        await downloadCSVFromS3(bucketName, csvKey, localFilePath);
        console.log('CSV downloaded successfully.');

        await loadProductsFromCSV(localFilePath);
    } catch (error) {
        console.error('Error downloading or processing the CSV:', error);
        console.error('Error details:', error.message);
        if (error.code) console.error('Error code:', error.code);
    }
};

// Start the process
main();