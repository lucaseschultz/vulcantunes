import { IconProps } from "@phosphor-icons/react";
import { ComponentType } from 'react';

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

export interface productSearchFilters {
  searchInput: string;
  selectedFeatures: Set<string>
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