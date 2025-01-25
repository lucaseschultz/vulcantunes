import { Component, ReactNode } from 'react'

enum ErrorType {
  NETWORK = 'network',
  UNKNOWN = 'unknown'
}

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
  private errorMessages: Record<ErrorType, ErrorMessageConfig> = {
    [ErrorType.NETWORK]: {
      title: 'Connection Error',
      message: 'Please check your internet connection and try again.',
      action: () => window.location.reload(),
      actionText: 'Retry'
    },
    [ErrorType.UNKNOWN]: {
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
      ? ErrorType.NETWORK
      : ErrorType.UNKNOWN

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
    if (!this.state.hasError) {
      return this.props.children
    }

    const errorConfig = this.state.errorType
      ? this.errorMessages[this.state.errorType]
      : this.errorMessages[ErrorType.UNKNOWN]

    return this.renderErrorMessage(errorConfig)
  }
}
