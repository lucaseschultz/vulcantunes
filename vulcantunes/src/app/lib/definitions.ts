import {IconProps} from "@phosphor-icons/react";
import {ChangeEvent, ComponentType, ReactNode} from 'react';

export interface IconNavItem {
  name: string;
  href: string;
  icon: ComponentType<IconProps>;
  size: number;
}

export interface ImageNavItem {
  name: string;
  href: string;
  icon: string;
  alt: string;
  width: number;
  height: number;
}

export interface WindowSize {
  width: number
  height: number
}

export interface Product {
  product_model: string
  product_image: string
  product_price: number
  product_quantity: number
  product_status: number
  product_name: string
  product_description: string
  features?: string
  options?: string
}

export interface ProductItemProps {
  product: Product;
}

export interface SearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface FilterSectionProps {
  selectedFeatures: Set<string>
  handleFeatureChange: (features: string) => void
}

export interface FeatureFiltersProps {
  selectedFeatures: Set<string>;
  onFeatureChange: (feature: string) => void;
}

export interface ProductsListErrorBoundaryProps {
  children: ReactNode
}

export interface ProductsListErrorBoundaryState {
  hasError: boolean
  errorType: ErrorType | null
  error?: Error
}

export const ErrorTypes = {
  NETWORK: 'network',
  NOT_FOUND: 'notFound',
  SERVER: 'serverError',
  UNKNOWN: 'unknown'
} as const
export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes]

export interface ErrorMessageConfig {
  title: string
  message: string
}

export interface ErrorMessageProps extends ErrorMessageConfig {
  error?: Error;
}

export interface ProductsListProps {
  featuresFilters: string;
}

export type ProductPageProps = {
  params: Promise<{
    model: string
  }>
};

export interface OptionValue {
  value: string;
  price: string;
  prefix: string;
  isDefault: boolean;
}

export interface OptionGroup {
  name: string;
  values: OptionValue[];
  optionType: number;
}

export interface OptionValuesProps {
  options: string | null;
  productModel: string;
}

export interface ProductPurchaseSectionProps {
  options?: string;
  productModel: string;
  productQuantity: number;
  productPrice: number;
  isDiscontinued: boolean;
  productName?: string;
}

export interface ProductQuantityProps {
  quantity: number;
  model: string;
  isDiscontinued: boolean;
}

export interface WishListItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface WishListButtonProps {
  product: WishListItem
}

export interface WishListItemProps {
  item: WishListItem;
}

export interface ProductMetadataProps {
  price: number;
  quantity: number;
  model: string;
  isDiscontinued: boolean;
}