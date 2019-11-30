import React from 'react';
import { Form, Button, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { FormValue, FormItemProps, renderFormItemComponent } from '../../form-creator';
import { date } from '@td-design/utils';

export type EditObject = {
  index: number;
  [key: string]: FormValue;
};

interface EditTableFormProps extends FormComponentProps {
  items: FormItemProps[];
  obj?: EditObject;
  onSubmit: (obj: EditObject) => void;
  onCancel: () => void;
  dateParams?: string[];
}

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
  },
};

function EditTableForm({ form, items, obj, onSubmit, onCancel, dateParams }: EditTableFormProps) {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      const formattedValues = {};
      if (dateParams && dateParams.length > 0) {
        dateParams.forEach(param => {
          const value = date.formatDate(values[param], 'YYYY-MM-DD');
          formattedValues[param] = value;
        });
      }
      if (!err) {
        onSubmit({
          ...values,
          ...formattedValues,
        });
      }
    });
  };

  const renderItem = (item: FormItemProps) => {
    return (
      <Form.Item label={item.formLabel} required={item.required}>
        {form.getFieldDecorator(item.name, item.decoratorOptions)(renderFormItemComponent(item))}
      </Form.Item>
    );
  };

  return (
    <Form {...layout}>
      <Form.Item>
        {form.getFieldDecorator('index', {
          initialValue: obj ? obj.index : 0,
        })(<Input type="hidden" />)}
      </Form.Item>
      {items.map(renderItem)}
      <div style={{ textAlign: 'center', borderTop: '1px solid #ebedf0', paddingTop: 20 }}>
        <Button type="primary" onClick={handleSubmit} style={{ marginRight: 20 }}>
          确定
        </Button>
        <Button onClick={onCancel}>取消</Button>
      </div>
    </Form>
  );
}

export default Form.create<EditTableFormProps>()(EditTableForm);
