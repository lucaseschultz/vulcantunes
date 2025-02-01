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
  name: string
  continent: string
  id: string
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
  UNKNOWN: 'unknown'
} as const
export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes]
export interface ErrorMessageConfig {
  title: string
  message: string
}
