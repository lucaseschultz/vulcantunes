import { IconProps } from "@phosphor-icons/react";

export interface IconNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<IconProps>;
}

export interface ImageNavItem {
  name: string;
  href: string;
  icon: string;
  alt: string;
}