import React from 'react';
import { Button, Form } from 'antd';
import styles from './index.module.less';

export default () => {
  return (
    <Form>
      <Form.Item className={styles.btnWrap}>
        <Button>123</Button>
      </Form.Item>
    </Form>
  );
};
