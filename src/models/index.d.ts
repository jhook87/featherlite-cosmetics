import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
  };
  readonly id: string;
  readonly SKU: string;
  readonly ColorDescription?: string | null;
  readonly ProductDetails?: string | null;
  readonly ProdutSize?: number | null;
  readonly ProductCategory?: string | null;
  readonly RetailPrice: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
  };
  readonly id: string;
  readonly SKU: string;
  readonly ColorDescription?: string | null;
  readonly ProductDetails?: string | null;
  readonly ProdutSize?: number | null;
  readonly ProductCategory?: string | null;
  readonly RetailPrice: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}