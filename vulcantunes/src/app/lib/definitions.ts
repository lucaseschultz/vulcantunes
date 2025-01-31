import { IconProps } from "@phosphor-icons/react";
import { ChangeEvent, ComponentType } from 'react';

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
export type ProductAction =
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'TOGGLE_FEATURE'; payload: string }
export interface ProductState {
  searchInput: string
  selectedFeatures: Set<string>
  filteredProducts: readonly Product[]
}
export interface Product {
  name: string
  continent: string
  id: string
  features?: string[]
}
export const ErrorTypes = {
  NETWORK: 'network',
  UNKNOWN: 'unknown'
} as const
export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes]
export interface FilterSectionProps {
  searchValue: string
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  selectedFeatures: Set<string>
  onFeatureChange: (feature: string) => void
}
export interface ProductItemProps {
  product: Product
}
export interface SearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

