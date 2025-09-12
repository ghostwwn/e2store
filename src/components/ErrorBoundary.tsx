import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorId: '' };
  }

  static getDerivedStateFromError(): State {
    // Generate a simple error ID without exposing system info
    const errorId = Math.random().toString(36).substring(2, 9);
    return { hasError: true, errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error securely - in production, send to monitoring service
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    } else {
      // In production, log minimal info and send to monitoring service
      console.error('Application error occurred. Error ID:', this.state.errorId);
      // TODO: Send to monitoring service like Sentry
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorId: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 bg-card rounded-lg border max-w-md mx-4">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={this.handleRetry} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Go Home
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-xs text-muted-foreground mt-4">
                Error ID: {this.state.errorId}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;