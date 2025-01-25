import { Component, ReactNode } from 'react'
import { ErrorType } from "@/src/app/lib/definitions";

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  errorType: ErrorType | null
  error?: Error
}

interface ErrorMessageConfig {
  title: string
  message: string
  action?: () => void
  actionText?: string
}

export class ProductsErrorBoundary extends Component<Props, State> {
  // Use private static for better memory usage
  private static readonly errorMessages: Record<ErrorType, ErrorMessageConfig> = {
    network: {
      title: 'Connection Error',
      message: 'Please check your internet connection and try again.',
      action: () => window.location.reload(),
      actionText: 'Retry'
    },
    unknown: {
      title: 'Unexpected Error',
      message: 'Something went wrong. Please try again later.'
    }
  }

  state: State = {
    hasError: false,
    errorType: null
  }

  static getDerivedStateFromError(error: Error): State {
    const errorType = error.message.toLowerCase().includes('fetch')
      ? 'network'
      : 'unknown'

    return {
      hasError: true,
      errorType,
      error
    }
  }

  private renderErrorMessage({ title, message, action, actionText }: ErrorMessageConfig) {
    const { error, errorType } = this.state

    return (
      <div
        className="error-container"
        role="alert"
        data-testid="error-boundary"
      >
        <h3 className="error-title">{title}</h3>
        <p className="error-message">
          {message}
          {error?.message && errorType === 'unknown' && (
            <span className="error-details">: {error.message}</span>
          )}
        </p>
        {action && (
          <button
            onClick={action}
            className="error-action"
            aria-label={actionText}
            type="button"
          >
            {actionText}
          </button>
        )}
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
      ? ProductsErrorBoundary.errorMessages[errorType]
      : ProductsErrorBoundary.errorMessages.unknown

    return this.renderErrorMessage(errorConfig)
  }
}
