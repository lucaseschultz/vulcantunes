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

  state: ProductsListErrorBoundaryState = Object.freeze({
    hasError: false,
    errorType: null,
    error: undefined
  });

  static getDerivedStateFromError(error: Error): ProductsListErrorBoundaryState {
    return {
      hasError: true,
      errorType: ProductsListErrorBoundary.getErrorType(error),
      error
    };
  }

  private static getErrorType(error: Error): ErrorType {
    if (!error) return 'unknown';

    const errorString = `${error.message} ${error.name}`.toLowerCase();

    const networkErrorPatterns = [
      'fetch',
      'network',
      'NetworkError',
      'AbortError',
      'TimeoutError',
      'failed to fetch',
      'internet'
    ];

    return networkErrorPatterns.some(pattern =>
      error.message.toLowerCase().includes(pattern) || error.name === pattern
    ) ? 'network' : 'unknown';
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <ProductsListErrorMessage
        {...ProductsListErrorBoundary.ERROR_MESSAGES[this.state.errorType ?? 'unknown']}
        error={this.state.error}
      />
    );
  }
}
