import { Component } from 'react'
import { ErrorType, ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState, ErrorMessageConfig } from "@/src/app/lib/definitions";
import { ProductsListErrorMessage } from './products-list-error-message';

export class ProductsListErrorBoundary extends Component<ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState> {
  private static readonly ERROR_MESSAGES: Readonly<Record<ErrorType, ErrorMessageConfig>> = {
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
      'fetch', 'network', 'networkerror', 'aborterror',
      'timeouterror', 'failed to fetch', 'internet'
    ];
    if (networkErrorPatterns.some(pattern => errorString.includes(pattern))) {
      return 'network';
    }

    const notFoundPatterns = [
      '404', 'not found', 'resource missing', 'content unavailable'
    ];
    if (notFoundPatterns.some(pattern => errorString.includes(pattern))) {
      return 'notFound';
    }

    const serverErrorPatterns = [
      '500', '502', '503', 'server error', 'internal error',
      'service unavailable'
    ];
    if (serverErrorPatterns.some(pattern => errorString.includes(pattern))) {
      return 'serverError';
    }

    return 'unknown';
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
