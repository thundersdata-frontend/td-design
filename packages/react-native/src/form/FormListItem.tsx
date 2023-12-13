import React, { FC, useContext, useMemo, useRef } from 'react';

import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';
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
  ...fieldProps
}) => {
  const theme = useTheme<Theme>();
  const ref = useRef<{ focus: () => void }>(null);
  const fieldContext = useContext(FieldContext);
  const [errors, setErrors] = useSafeState<string[]>([]);
  const { formItemHeight, bordered } = useContext(FormContext);

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
      {...{ title, required, thumb, onPress, arrow, backgroundColor }}
      brief={Error}
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
          paddingHorizontal: 0,
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
