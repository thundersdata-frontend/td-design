import React, { FC, useContext, useMemo, useRef } from 'react';

import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';
import { Field, FieldContext } from 'rc-field-form';
import { Meta } from 'rc-field-form/es/interface';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import { FormContext } from './context';
import { FormItemProps } from './type';

const { ONE_PIXEL } = helpers;

const FormItem: FC<FormItemProps> = ({ children, type = 'bottom', name, ...fieldProps }) => {
  const theme = useTheme<Theme>();
  const ref = useRef<{ focus: () => void }>(null);
  const fieldContext = useContext(FieldContext);
  const [errors, setErrors] = useSafeState<string[]>([]);

  const { formItemHeight } = useContext(FormContext);

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
    if (errors.length === 0) return null;

    return (
      <Text variant="p3" color="func600">
        {errors[0]}
      </Text>
    );
  }, [errors]);

  return (
    <Box
      height={formItemHeight}
      justifyContent={'center'}
      borderBottomColor={'border'}
      borderBottomWidth={ONE_PIXEL}
      style={errors.length > 0 ? createStyleByType() : {}}
    >
      <Field name={name} {...fieldProps} onMetaChange={onMetaChange}>
        {React.cloneElement(children, {
          ref,
          brief: Error,
        })}
      </Field>
    </Box>
  );
};
FormItem.displayName = 'FormItem';

export default FormItem;
