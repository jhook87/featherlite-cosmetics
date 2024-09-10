// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema.js';

const { Product } = initSchema(schema);

export {
    Product,
    schema
};