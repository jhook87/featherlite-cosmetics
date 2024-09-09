import fs from 'fs';
import csv from 'csv-parser'; // For parsing the CSV
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports.js'; // Import the Amplify configuration
import { DataStore } from '@aws-amplify/datastore';
import { Product } from './models/index.js'; // Updated import for Product model
import AWS from 'aws-sdk'; // AWS SDK for accessing S3

// Configure Amplify and AWS
Amplify.configure(awsconfig);

// Initialize S3 client
const s3 = new AWS.S3();

// Function to download CSV from S3
const downloadCSVFromS3 = async (bucket, key, localPath) => {
    const params = {
        Bucket: bucket,
        Key: key,
    };

    const file = fs.createWriteStream(localPath);
    return new Promise((resolve, reject) => {
        s3.getObject(params)
            .createReadStream()
            .pipe(file)
            .on('finish', resolve)
            .on('error', reject);
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

    // Read and parse the CSV file
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // Map CSV rows to product objects
            products.push({
                SKU: row.SKU,
                ColorDescription: row.ColorDescription,
                ProductDetails: row.ProductDetails,
                ProductSize: parseFloat(row.ProductSize), // Convert to number
                ProductCategory: row.ProductCategory,
                RetailPrice: parseFloat(row.RetailPrice), // Convert to number
                SubscriptionPrice: parseFloat(row.SubscriptionPrice), // Convert to number
                ProductDescription: row.ProductDescription,
            });
        })
        .on('end', async () => {
            console.log(`Parsed ${products.length} products from CSV.`);
            await insertProducts(products); // Insert the parsed products
            console.log('All products inserted successfully.');
        });
};

// Main function to handle the process
const main = async () => {
    const bucketName = 'featherlites3';
    const csvKey = 'ProductList - Sheet1 (1).csv';
    const localFilePath = './ProductList.csv'; // Path to store the downloaded CSV

    // Download the CSV from S3
    try {
        console.log(`Downloading CSV from S3: s3://${bucketName}/${csvKey}`);
        await downloadCSVFromS3(bucketName, csvKey, localFilePath);
        console.log('CSV downloaded successfully.');

        // Load and process the products from the downloaded CSV
        await loadProductsFromCSV(localFilePath);
    } catch (error) {
        console.error('Error downloading or processing the CSV:', error);
    }
};

// Start the process
main();
