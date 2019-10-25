import React from 'react';
import * as Sentry from '@sentry/browser';

export interface ErrorBoundaryProps {
  errorContent?: JSX.Element;
}
const initialState = {
  hasError: false,
};
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  public state: typeof initialState = initialState;

  public componentDidCatch(err: Error) {
    this.setState({
      hasError: true,
    });
    Sentry.captureException(err);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.errorContent || <h1>对不起，程序出现故障</h1>;
    }
    return this.props.children;
  }
}
