import React, { createRef } from 'react';
import { RegisterForm } from '@td-design/web';
import { FormComponentProps } from 'antd/lib/form';

export default () => {
  const formRef = createRef<FormComponentProps>();
  const handleSubmit = () => {
    console.log(123);
  };
  const beforeSubmit = async () => {
    const username = formRef.current!.form.getFieldValue('username');
    if (username) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  };
  return (
    <div style={{ width: 500, height: 500 }}>
      <RegisterForm
        afterSubmit={handleSubmit}
        beforeSubmit={beforeSubmit}
        wrappedComponentRef={formRef}
      />
    </div>
  );
};
