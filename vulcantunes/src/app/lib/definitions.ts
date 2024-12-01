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