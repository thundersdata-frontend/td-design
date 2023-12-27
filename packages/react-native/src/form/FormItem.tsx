import React, { FC, useContext, useMemo, useRef } from 'react';

import { useTheme } from '@shopify/restyle';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { Field, FieldContext } from 'rc-field-form';
import { Meta } from 'rc-field-form/es/interface';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import { FormContext } from './context';
import { FormItemProps } from './type';

const { ONE_PIXEL } = helpers;

const FormItem: FC<FormItemProps> = ({ children, type = 'bottom', noStyle = false, name, ...fieldProps }) => {
  const theme = useTheme<Theme>();
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

  const createStyleByType = () => {
    if (type === 'bottom') {
      return { borderBottomWidth: 1, borderBottomColor: theme.colors.func600 };
    }
    if (type === 'all') {
      return { borderWidth: 1, borderColor: theme.colors.func600 };
    }
    return {};
  };

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
          style: {
            height: formItemHeight,
          },
          inputStyle: children.props.inputStyle
            ? {
                padding: 0,
                ...children.props.inputStyle,
              }
            : {
                padding: 0,
              },
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
      borderBottomColor={'border'}
      borderBottomWidth={bordered ? ONE_PIXEL : 0}
      style={errors.length > 0 ? createStyleByType() : {}}
    >
      {Content}
    </Box>
  );
};
FormItem.displayName = 'FormItem';

export default FormItem;
