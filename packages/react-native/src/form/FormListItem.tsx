import React, { FC, useContext, useRef } from 'react';

import { useTheme } from '@shopify/restyle';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { Field, FieldContext } from 'rc-field-form';
import { Meta } from 'rc-field-form/es/interface';

import helpers from '../helpers';
import ListItem from '../list-item';
import Text from '../text';
import { Theme } from '../theme';
import { FormContext } from './context';
import { FormListItemProps } from './type';

const { ONE_PIXEL } = helpers;

const FormListItem: FC<FormListItemProps> = ({
  children,
  title,
  required,
  style,
  thumb,
  onPress,
  name,
  arrow,
  backgroundColor,
  noStyle = false,
  ...fieldProps
}) => {
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

  if (noStyle)
    return (
      <Field {...fieldProps} name={name} onMetaChange={onMetaChange}>
        {React.cloneElement(children, {
          ref,
        })}
      </Field>
    );

  return (
    <ListItem
      {...{ title, required, thumb, onPress, arrow, backgroundColor }}
      brief={
        errors.length > 0 ? (
          <Text variant="p3" color="func600">
            {errors[0]}
          </Text>
        ) : null
      }
      extra={
        <Field {...fieldProps} name={name} onMetaChange={onMetaChange}>
          {React.cloneElement(children, {
            ref,
          })}
        </Field>
      }
      style={[
        {
          minHeight: formItemHeight,
          borderBottomWidth: bordered ? ONE_PIXEL : 0,
        },
        errors.length > 0
          ? {
              borderBottomColor: theme.colors.func600,
              borderBottomWidth: 1,
            }
          : {},
        style,
      ]}
    />
  );
};
FormListItem.displayName = 'FormListItem';

export default FormListItem;
