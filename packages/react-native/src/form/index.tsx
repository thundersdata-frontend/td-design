import React, { FC } from 'react';

import RcForm, { useForm } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/es/Form';

import helpers from '../helpers';
import { FormContext } from './context';
import FormItem from './FormItem';
import FormListItem from './FormListItem';

const { px } = helpers;

export type FormProps = Omit<RcFormProps, 'component'> & { formItemHeight?: number; bordered?: boolean };

const Form: FC<FormProps> = ({ children, formItemHeight = px(54), bordered = true, ...props }) => {
  return (
    <RcForm component={false} {...props}>
      <FormContext.Provider value={{ formItemHeight, bordered }}>{children}</FormContext.Provider>
    </RcForm>
  );
};
Form.displayName = 'Form';

export { Form, FormItem, FormListItem, useForm };
