import { Product } from "@/src/app/lib/definitions";

export const PRODUCTS: readonly Product[] = [
  { name: "United States", continent: "North America", id: "us" },
  { name: "Australia", continent: "Oceania", id: "au" },
  { name: "Belgium", continent: "Europe", id: "be" },
  { name: "Bolivia", continent: "South America", id: "bo" },
  { name: "Brazil", continent: "South America", id: "br" },
  { name: "Canada", continent: "North America", id: "ca" },
  { name: "Ghana", continent: "Africa", id: "gh" },
  { name: "India", continent: "Asia", id: "in" },
  { name: "Japan", continent: "Asia", id: "jp" },
  { name: "Sweden", continent: "Europe", id: "se" }
] as const;

export const FEATURE_FILTERS = {
  "Bluetooth": false,
  "USB Charger": false,
  "AUX Input": false,
  "AUX Output": false,
  "Audio Jack": false
} as const
