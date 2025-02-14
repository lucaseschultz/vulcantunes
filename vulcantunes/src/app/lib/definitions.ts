import { IconProps } from "@phosphor-icons/react";
import { ChangeEvent, ComponentType, ReactNode } from 'react';

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
  product_id: number
  product_model: string
  product_image: string
  product_price: number
  product_quantity: number
  product_status: number
  features?: string[]
}
export interface ProductItemProps {
  product: Product
}
export interface SearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export interface FilterSectionProps {
  searchValue: string
  features: Set<string>
  handleSearchChange: (value: string) => void
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
export interface ProductsListErrorMessageProps extends ErrorMessageConfig {
  error?: Error;
}
export interface ProductsListProps {
  searchFilter: string;
  featuresFilter: string;
}
