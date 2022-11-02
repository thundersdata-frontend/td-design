import RcForm, { useForm } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/es/Form';
import React, { FC } from 'react';

import { FormItem } from './FormItem';
import { FormListItem } from './FormListItem';

export type FormProps = Omit<RcFormProps, 'component'>;

const Form: FC<FormProps> = ({ children, ...props }) => {
  return (
    <RcForm component={false} {...props}>
      {children}
    </RcForm>
  );
};

export default Object.assign(Form, { FormItem, FormListItem, useForm });
