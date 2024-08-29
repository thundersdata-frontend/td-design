import React, { FC, useContext, useRef } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { Field, FieldContext } from 'rc-field-form';
import { Meta } from 'rc-field-form/es/interface';

import ListItem from '../list-item';
import Text from '../text';
import { FormContext } from './context';
import { FormListItemProps } from './type';

const FormListItem: FC<FormListItemProps> = ({
  children,
  label,
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
      const errors = fieldContext.getFieldsError() || [];
      const fieldErrors = errors.filter(item => item.errors.length > 0);
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
      {...{ required, thumb, onPress, arrow, backgroundColor }}
      title={label}
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
            inForm: true,
          })}
        </Field>
      }
      style={{ minHeight: formItemHeight, paddingHorizontal: 0 }}
      bordered={bordered}
      borderColor={errors.length > 0 ? 'func600' : 'border'}
    />
  );
};
FormListItem.displayName = 'FormListItem';

export default FormListItem;
