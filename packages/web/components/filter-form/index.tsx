import React, { useState } from 'react';
import {
  Form,
  Row,
  Col,
  InputNumber,
  TreeSelect,
  Select,
  Input,
  DatePicker,
  Checkbox,
  Radio,
  Button,
  Icon,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { OptionProps } from 'antd/lib/select';
import { TreeNode } from 'antd/lib/tree-select';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { Moment } from 'moment';
import RangePicker from '../range-picker';

export declare type FormItemType =
  | 'input'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'datepicker'
  | 'rangepicker'
  | 'number'
  | 'treeselect';
export declare type FormValue = undefined | string | number | boolean | Moment;
export interface FormItemProps {
  name: string;
  formLabel: string;
  type: FormItemType;
  placeholder?: string | [string, string];
  dataSource?: OptionProps[] | TreeNode[] | (CheckboxOptionType | string)[];
}
export interface FilterFormProps extends FormComponentProps {
  formItems?: FormItemProps[];
  onSubmit?: (values: { [key: string]: FormValue }) => void;
  onReset?: () => void;
}
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const FilterForm: React.FC<FilterFormProps> = ({ formItems, onSubmit, onReset, form }) => {
  const [collapsed, onCollapse] = useState(true);
  const { getFieldDecorator } = form;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields((_, values) => {
      if (onSubmit) {
        onSubmit(values);
      }
    });
  };
  if (!formItems || formItems.length === 0) return null;
  if (formItems.length <= 4) {
    return (
      <Form onSubmit={handleSubmit} {...formItemLayout} labelAlign="left">
        <Row gutter={24}>
          {formItems.map((item, index) => (
            <Col key={index} span={6}>
              <Form.Item label={item.formLabel}>{getFieldDecorator(item.name)(getElementByType(item))}</Form.Item>
            </Col>
          ))}
          <Col span={6}>
            <Form.Item label="">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <span style={{ paddingLeft: 8 }} />
              <Button type="default" htmlType="reset" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  const count = collapsed ? 3 : formItems.length;
  return (
    <Form onSubmit={handleSubmit} {...formItemLayout} labelAlign="left">
      <Row gutter={24}>
        {formItems.map((item, index) => (
          <Col key={index} span={6} style={{ display: index < count ? 'block' : 'none' }}>
            <Form.Item label={item.formLabel}>{getFieldDecorator(item.name)(getElementByType(item))}</Form.Item>
          </Col>
        ))}
        <Col span={6}>
          <Form.Item label="">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <span style={{ paddingLeft: 8 }} />
            <Button type="default" htmlType="reset" onClick={onReset}>
              重置
            </Button>
            <span style={{ paddingLeft: 8 }} />
            <a onClick={() => onCollapse(!collapsed)}>
              {collapsed ? '展开' : '收起'}
              &nbsp;
              <Icon type={collapsed ? 'down' : 'up'} />
            </a>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<FilterFormProps>()(FilterForm);

function getElementByType(item: FormItemProps) {
  const { type, placeholder, dataSource } = item;
  switch (type) {
    case 'input':
    default:
      return <Input placeholder={placeholder as string} />;
    case 'checkbox':
      return <Checkbox.Group options={dataSource as (CheckboxOptionType | string)[]} />;
    case 'radio':
      return (
        <Radio.Group>
          {(dataSource as CheckboxOptionType[]).map(radio => (
            <Radio key={`${radio.value}`} value={radio.value}>
              {radio.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case 'select':
      return (
        <Select placeholder={placeholder}>
          {(dataSource as OptionProps[]).map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.title}
            </Select.Option>
          ))}
        </Select>
      );
    case 'datepicker':
      return <DatePicker placeholder={placeholder as string} style={{ width: '100%' }} />;
    case 'rangepicker':
      return <RangePicker />;
    case 'number':
      return <InputNumber placeholder={placeholder as string} style={{ width: '100%' }} />;
    case 'treeselect':
      return <TreeSelect treeData={dataSource as TreeNode[]} />;
  }
}
