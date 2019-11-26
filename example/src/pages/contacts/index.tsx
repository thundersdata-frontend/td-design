import React, { createRef } from 'react';
import { LoginForm } from '@td-design/web';
import { FormComponentProps } from 'antd/lib/form';

export default () => {
  const formRef = createRef<FormComponentProps>();

  const handleBeforeSubmit = async () => {
    const username = formRef.current!.form.getFieldValue('username');
    if (username) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  };

  const handleAfterSubmit = () => {
    console.log(123);
  };

  return (
    <div style={{ width: 500, height: 500 }}>
      <LoginForm
        beforeSubmit={handleBeforeSubmit}
        afterSubmit={handleAfterSubmit}
        wrappedComponentRef={formRef}
      />
    </div>
  );
};
