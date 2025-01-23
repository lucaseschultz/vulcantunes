import { IconProps } from "@phosphor-icons/react";

export interface IconNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<IconProps>;
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

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}
