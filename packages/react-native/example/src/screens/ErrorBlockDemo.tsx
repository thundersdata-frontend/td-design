import React, { ErrorInfo } from 'react';
import { ErrorBlock } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';
import { useEffect } from 'react';

export default function ErrorBlockDemo() {
  const onError = (err: Error, errorInfo: ErrorInfo) => {
    console.log(err, errorInfo);
  };

  return (
    <Container>
      <ErrorBlock type="network-error" onError={onError}>
        <Demo1 />
      </ErrorBlock>
    </Container>
  );
}

function Demo1(props: { a?: number }) {
  useEffect(() => {
    console.log('11');
    // @ts-ignore
    props.a.b;

    console.log('22');
  }, []);

  return <View />;
}
