import React, { ErrorInfo, FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import ErrorBoundary from './ErrorBoundary';

export type ErrorType = 'network-error' | 'custom-error' | 'business-error' | 'request-error';

const ErrorBlock: FC<{ type?: ErrorType; onError?: (error: Error, errorInfo: ErrorInfo) => void }> = ({
  type,
  children,
  onError,
}) => {
  const Fallback = useMemo(() => {
    switch (type) {
      case 'network-error':
        return (
          <View>
            <Text>network</Text>
          </View>
        );

      case 'business-error':
        return (
          <View>
            <Text>business</Text>
          </View>
        );

      case 'request-error':
        return (
          <View>
            <Text>request</Text>
          </View>
        );

      case 'custom-error':
        return (
          <View>
            <Text>custom</Text>
          </View>
        );

      default:
        return <View />;
    }
  }, [type]);

  return (
    <ErrorBoundary fallback={Fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBlock;
