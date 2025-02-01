import { Component } from 'react'
import { ErrorType, ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState, ErrorMessageConfig } from "@/src/app/lib/definitions";

export class ProductsListErrorBoundary extends Component<ProductsListErrorBoundaryProps, ProductsListErrorBoundaryState> {
  private static readonly errorMessages: Record<ErrorType, ErrorMessageConfig> = {
    network: {
      title: 'Connection Error',
      message: 'Please check your internet connection and try again.',
    },
    unknown: {
      title: 'Unexpected Error',
      message: 'Something went wrong. Please try again later.'
    }
  }

  readonly state: ProductsListErrorBoundaryState = {
    hasError: false,
    errorType: null
  }

  static getDerivedStateFromError(error: Error): ProductsListErrorBoundaryState {
    const isNetworkError = error.message.toLowerCase().includes('fetch') ||
      error.name === 'NetworkError';

    return {
      hasError: true,
      errorType: isNetworkError ? 'network' : 'unknown',
      error
    }
  }

  private renderErrorMessage = ({ title, message }: ErrorMessageConfig) => {
    const { error, errorType } = this.state;

    return (
      <div
        className="error-container"
        role="alert"
        data-testid="error-boundary"
      >
        <h3 className="error-title">
          {title}
        </h3>
        <div className="error-content">
          <div className="error-message">
            {message}
          </div>
          {error?.message && errorType !== 'network' && (
            <div className="error-details">
              {error.message}
            </div>
          )}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="error-button"
          aria-label="Refresh"
          type="button"
        >
          Refresh
        </button>
      </div>
    )
  }

  render() {
    const { hasError, errorType } = this.state
    const { children } = this.props

    if (!hasError) {
      return children
    }

    const errorConfig = ProductsListErrorBoundary.errorMessages[errorType ?? 'unknown']
    return this.renderErrorMessage(errorConfig)
  }
}
