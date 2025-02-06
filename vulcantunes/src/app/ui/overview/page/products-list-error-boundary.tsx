import { Component } from 'react'
import { ErrorType, ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState, ErrorMessageConfig } from "@/src/app/lib/definitions";
import { ProductsListErrorMessage } from './products-list-error-message';

export class ProductsListErrorBoundary extends Component<ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState> {
  private static readonly ERROR_MESSAGES: Readonly<Record<ErrorType, ErrorMessageConfig>> = {
    network: {
      title: 'Connection Error',
      message: 'Please check your internet connection and try again.',
    },
    unknown: {
      title: 'Unexpected Error',
      message: 'Something went wrong. Please try again later.'
    }
  } as const;

  state: ProductsListErrorBoundaryState = {
    hasError: false,
    errorType: null,
    error: undefined
  };

  static getDerivedStateFromError(error: Error): ProductsListErrorBoundaryState {
    const isNetworkError = error.message.toLowerCase().includes('fetch') ||
      error.name === 'NetworkError';

    return {
      hasError: true,
      errorType: isNetworkError ? 'network' : 'unknown',
      error
    }
  }

  render() {
    const { hasError, errorType, error } = this.state
    const { children } = this.props

    if (!hasError) {
      return children
    }

    const errorConfig = ProductsListErrorBoundary.ERROR_MESSAGES[errorType ?? 'unknown'];
    return (
      <ProductsListErrorMessage
        {...errorConfig}
        error={error}
        errorType={errorType}
      />
    );
  }
}
