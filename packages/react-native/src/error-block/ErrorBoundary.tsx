import React, { ErrorInfo, ReactNode } from 'react';

export default class ErrorBoundary extends React.Component<
  { fallback: ReactNode; onError?: (error: Error, errorInfo: ErrorInfo) => void },
  { error: Error | null }
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 错误上报
    if (this.props.onError) {
      this.props.onError(error, info);
    } else {
      console.error(error, info);
    }
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
