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
    const errorType = ProductsListErrorBoundary.getErrorType(error);

    return {
      hasError: true,
      errorType,
      error
    };
  }

  // Separate error type detection logic for better maintainability
  private static getErrorType(error: Error): ErrorType {
    if (!error) return 'unknown';

    const errorMessage = error.message.toLowerCase();
    const isNetworkError =
      errorMessage.includes('fetch') ||
      errorMessage.includes('network') ||
      error.name === 'NetworkError' ||
      error.name === 'AbortError' ||
      error.name === 'TimeoutError';

    return isNetworkError ? 'network' : 'unknown';
  }

  render() {
    const { hasError, errorType, error } = this.state;
    const { children } = this.props;

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
