import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

type ErrorType = 'network' | 'unknown'

interface State {
  hasError: boolean
  errorType: ErrorType | null
  error?: Error
}

export class ProductsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      errorType: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    let errorType: ErrorType = 'unknown'

    if (error.message.includes('fetch')) {
      errorType = 'network'
    }

    return {
      hasError: true,
      errorType,
      error
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    switch (this.state.errorType) {
      case 'network':
        return (
          <div className="error-network">
            <h3>Connection Error</h3>
            <p>Please check your internet connection and try again.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )

      default:
        return (
          <div className="error-unknown">
            <h3>Unexpected Error</h3>
            <p>{this.state.error?.message}</p>
          </div>
        )
    }
  }
}
