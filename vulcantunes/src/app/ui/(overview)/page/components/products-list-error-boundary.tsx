import {Component} from 'react'
import {ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState} from "@/src/app/lib/definitions";
import {ErrorMessage} from '@/src/app/ui/(overview)/layout/components/error-message';
import {getErrorMessage} from '@/src/app/lib/utils';

export class ProductsListErrorBoundary extends Component<ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState> {
  state: ProductsListErrorBoundaryState = Object.freeze({
    hasError: false,
    errorType: null,
    error: undefined
  });

  render() {
    if (!this.state.hasError) return this.props.children;

    const errorMessageConfig = getErrorMessage(this.state.error);

    return (
      <ErrorMessage
        {...errorMessageConfig}
        error={this.state.error}
      />
    );
  }
}
