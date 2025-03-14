import { Component } from 'react'
import { ErrorType, ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState } from "@/src/app/lib/definitions";
import { ErrorMessage } from '../layout/error-message';
import { PRODUCTS_ERROR_MESSAGES } from '@/src/app/lib/constants';
import { getErrorType } from '@/src/app/lib/utils';

export class ProductsListErrorBoundary extends Component<ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState> {
  state: ProductsListErrorBoundaryState = Object.freeze({
    hasError: false,
    errorType: null,
    error: undefined
  });

  static getDerivedStateFromError(error: Error): ProductsListErrorBoundaryState {
    return {
      hasError: true,
      errorType: getErrorType(error),
      error
    };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <ErrorMessage
        {...PRODUCTS_ERROR_MESSAGES[this.state.errorType ?? 'unknown']}
        error={this.state.error}
      />
    );
  }
}
