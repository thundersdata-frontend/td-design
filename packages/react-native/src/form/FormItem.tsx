import React, { FC, useContext, useMemo, useRef } from 'react';
import { Field, FieldContext } from 'rc-field-form';
import { Meta } from 'rc-field-form/es/interface';
import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';

import { FormItemProps } from './type';
import { Theme } from '../theme';
import Text from '../text';

export const FormItem: FC<FormItemProps> = ({ children, type = 'bottom', name, ...fieldProps }) => {
  const theme = useTheme<Theme>();
  const ref = useRef<{ focus: () => void }>(null);
  const fieldContext = useContext(FieldContext);
  const [errors, setErrors] = useSafeState<string[]>([]);

  const onMetaChange = (
    meta: Meta & {
      destroy?: boolean;
    }
  ) => {
    setErrors(meta.errors);
    const fieldErrors = fieldContext.getFieldsError().filter(item => item.errors.length > 0);
    if (fieldErrors.length > 0 && name === fieldErrors[0]?.name?.[0]) {
      ref.current?.focus();
    }
  };

  const createStyleByType = () => {
    if (type === 'bottom') {
      return { borderBottomWidth: 1, borderBottomColor: theme.colors.func600 };
    }
    if (type === 'all') {
      return { borderWidth: 1, borderColor: theme.colors.func600 };
    }
    return {};
  };

  const Error = useMemo(() => {
    if (errors.length > 0) {
      return (
        <Text variant="p3" color="func600">
          {errors[0]}
        </Text>
      );
    }
    return null;
  }, [errors]);

  return (
    <Field name={name} {...fieldProps} onMetaChange={onMetaChange}>
      {React.cloneElement(children, {
        ref,
        style: errors.length > 0 ? createStyleByType() : {},
        brief: Error,
      })}
    </Field>
  );
};
