import { ErrorMessageConfig, ErrorType } from "./definitions";

export const FEATURE_FILTERS = {
  "Bluetooth": false,
  "USB Charger": false,
  "AUX Input": false,
  "AUX Output": false,
} as const
export const ERROR_MESSAGES: Record<ErrorType, ErrorMessageConfig> = {
  network: {
    title: 'Connection Error',
    message: 'Please check your internet connection and try again.',
  },
  notFound: {
    title: 'Content Not Found',
    message: 'The requested content could not be found.',
  },
  serverError: {
    title: 'Server Error',
    message: 'Our servers are experiencing issues. Please try again later.',
  },
  unknown: {
    title: 'Unexpected Error',
    message: 'Something went wrong. Please try again later.'
  }
} as const;
