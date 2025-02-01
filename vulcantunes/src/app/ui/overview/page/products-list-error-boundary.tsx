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

  state: ProductsListErrorBoundaryState = {
    hasError: false,
    errorType: null
  }

  static getDerivedStateFromError(error: Error): ProductsListErrorBoundaryState {
    const errorType = error.message.toLowerCase().includes('fetch')
      ? 'network'
      : 'unknown'

    return {
      hasError: true,
      errorType,
      error
    }
  }

  private renderErrorMessage({ title, message }: ErrorMessageConfig) {
    const { error, errorType } = this.state

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
          className="error-action"
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

    const errorConfig = errorType
      ? ProductsListErrorBoundary.errorMessages[errorType]
      : ProductsListErrorBoundary.errorMessages.unknown

    return this.renderErrorMessage(errorConfig)
  }
}
