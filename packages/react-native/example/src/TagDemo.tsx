import React from 'react';
import { Tag, WhiteSpace, WingBlank } from '@td-design/react-native';

export default () => {
  return (
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
  );
};
