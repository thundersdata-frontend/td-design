import React, { FC, useContext, useMemo, useRef } from 'react';

import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';
import { Field, FieldContext } from 'rc-field-form';
import { Meta } from 'rc-field-form/es/interface';

import ListItem from '../list-item';
import Text from '../text';
import { Theme } from '../theme';
import { FormListItemProps } from './type';

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
  ...fieldProps
}) => {
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

  const Error = useMemo(() => {
    if (errors.length === 0) return null;

    return (
      <Text variant="p3" color="func600">
        {errors[0]}
      </Text>
    );
  }, [errors]);

  return (
    <ListItem
      {...{ title, required, style, thumb, onPress, arrow, backgroundColor }}
      brief={Error}
      extra={
        <Field {...fieldProps} name={name} onMetaChange={onMetaChange}>
          {React.cloneElement(children, {
            ref,
          })}
        </Field>
      }
      style={
        errors.length > 0
          ? {
              borderBottomColor: theme.colors.func600,
              borderBottomWidth: 1,
            }
          : {}
      }
    />
  );
};
FormListItem.displayName = 'FormListItem';

export default FormListItem;
