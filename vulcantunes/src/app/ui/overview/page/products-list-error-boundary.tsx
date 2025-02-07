import { Component } from 'react'
import { ErrorType, ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState } from "@/src/app/lib/definitions";
import { ProductsListErrorMessage } from './products-list-error-message';
import { ERROR_MESSAGES } from '@/src/app/lib/constants';

export class ProductsListErrorBoundary extends Component<ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState> {
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
        {...ERROR_MESSAGES[this.state.errorType ?? 'unknown']}
        error={this.state.error}
      />
    );
  }
}
