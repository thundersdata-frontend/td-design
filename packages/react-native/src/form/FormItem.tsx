import React, { FC, useContext, useMemo, useRef } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { Field, FieldContext } from 'rc-field-form';
import { Meta } from 'rc-field-form/es/interface';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { FormContext } from './context';
import { FormItemProps } from './type';

const { ONE_PIXEL } = helpers;

const FormItem: FC<FormItemProps> = ({ children, noStyle = false, name, ...fieldProps }) => {
  const ref = useRef<{ focus: () => void }>(null);
  const fieldContext = useContext(FieldContext);
  const [errors, setErrors] = useSafeState<string[]>([]);

  const { formItemHeight, bordered } = useContext(FormContext);

  const onMetaChange = useMemoizedFn(
    (
      meta: Meta & {
        destroy?: boolean;
      }
    ) => {
      setErrors(meta.errors);
      const fieldErrors = fieldContext.getFieldsError().filter(item => item.errors.length > 0);
      if (fieldErrors.length > 0 && name === fieldErrors[0]?.name?.[0]) {
        ref.current?.focus();
      }
    }
  );

  const Content = useMemo(
    () => (
      <Field name={name} {...fieldProps} onMetaChange={onMetaChange}>
        {React.cloneElement(children, {
          ref,
          brief:
            errors.length > 0 ? (
              <Text variant="p3" color="func600">
                {errors[0]}
              </Text>
            ) : null,
          labelHeight: formItemHeight,
          inForm: !noStyle,
        })}
      </Field>
    ),
    [name, fieldProps, formItemHeight, errors]
  );

  if (noStyle) return Content;

  return (
    <Box
      minHeight={formItemHeight}
      justifyContent={'center'}
      borderBottomColor={errors.length > 0 ? 'func600' : 'border'}
      borderBottomWidth={bordered ? ONE_PIXEL : 0}
      paddingHorizontal={'x2'}
    >
      {Content}
    </Box>
  );
};
FormItem.displayName = 'FormItem';

export default FormItem;
