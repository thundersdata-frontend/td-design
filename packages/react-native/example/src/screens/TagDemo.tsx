import React from 'react';
import { Tag, WhiteSpace, WingBlank } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <WingBlank>
        <WhiteSpace />
        <Tag checked type="primary" disabled>
          magenta
        </Tag>
        <WhiteSpace />
        <Tag color="red" checked size="small" type="primary" disabled>
          magenta
        </Tag>
        <WhiteSpace />
        <Tag closable>magenta</Tag>
        <WhiteSpace />
        <Tag size="large" closable>
          magenta
        </Tag>
        <WhiteSpace />
        <Tag color="red" size="small" closable>
          magenta
        </Tag>
        <WhiteSpace />
      </WingBlank>
    </Container>
  );
};
