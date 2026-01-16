import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-6 z-50">
          <div className="modern-card max-w-md w-full p-8 text-center">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              The application encountered an unexpected error.
            </p>

            {this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-mono text-red-800 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="modern-button w-full"
              >
                🔄 Reload Application
              </button>
              
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
