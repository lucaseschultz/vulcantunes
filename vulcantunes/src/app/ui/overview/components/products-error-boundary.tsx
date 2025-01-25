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

  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      errorType: null
    }
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

  private renderErrorMessage(config: ErrorMessageConfig) {
    return (
      <div className="error-container" role="alert">
        <h3 className="error-title">{config.title}</h3>
        <p className="error-message">
          {config.message}
          {this.state.error?.message && this.state.errorType === ErrorType.UNKNOWN && (
            <span className="error-details">: {this.state.error.message}</span>
          )}
        </p>
        {config.action && (
          <button
            onClick={config.action}
            className="error-action"
            aria-label={config.actionText}
          >
            {config.actionText}
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
