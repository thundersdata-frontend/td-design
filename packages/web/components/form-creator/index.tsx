/*
 * @文件描述: 用于生成表单
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-21 20:13:12
 * @LastEditors  : 黄姗姗
 * @LastEditTime : 2019-12-19 11:15:39
 */
import React from 'react';
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
  Upload,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { OptionProps } from 'antd/lib/select';
import { TreeNode } from 'antd/lib/tree-select';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { Moment } from 'moment';
import RangePicker from '../range-picker';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { FormLabelAlign } from 'antd/lib/form/FormItem';
import RichEditor from '../rich-editor';
import { MediaType } from 'braft-editor';
import { UploadProps } from 'antd/lib/upload';

export declare type FormItemType =
  | 'input'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'datepicker'
  | 'rangepicker'
  | 'number'
  | 'treeselect'
  | 'textarea'
  | 'upload'
  | 'richeditor';

export declare type FormCreatorColumns = 1 | 2;

export declare type FormValue = string | number | boolean | Moment | Date | null | undefined;

export interface FormItemProps {
  /**表单项名称 */
  name: string;
  /**表单项label */
  formLabel: string;
  /**表单项类型 */
  type: FormItemType;
  /**表单项placeholder */
  placeholder?: string | [string, string];
  /**表单项数据源 */
  dataSource?: OptionProps[] | TreeNode[] | (CheckboxOptionType | string)[];
  /**表单项占用列数，默认为1，最大为2 */
  columns?: FormCreatorColumns;
  /**表单项的配置 */
  decoratorOptions?: GetFieldDecoratorOptions;
  /**是否必填 */
  required?: boolean;
  mediaType?: MediaType;
  uploadProps?: UploadProps;
  uploadChildren?: JSX.Element;
}

export interface FormCreatorProps extends FormComponentProps {
  /**表单项 */
  formItems?: FormItemProps[];
  /**提交函数 */
  onSubmit?: (values: { [key: string]: FormValue }) => void;
  /**重置函数 */
  onReset?: () => void;
  /**提交文本，默认为确定 */
  submitText?: string;
  /**重置文本，默认为取消 */
  resetText?: string;
  /**表单项列数，默认为1 */
  columns?: FormCreatorColumns;
  buttonClassName?: string;
  /**label标签的文本对齐方式 */
  labelAlign?: FormLabelAlign;
  /** 是否显示冒号 */
  colon?: boolean;
}

const formItemLayout = {
  1: {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 18,
    },
  },
  2: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 12,
    },
  },
};

const FormCreator: React.FC<FormCreatorProps> = ({
  formItems,
  onSubmit,
  onReset,
  submitText = '确定',
  resetText = '取消',
  columns = 1,
  buttonClassName,
  labelAlign = 'right',
  form,
  colon = true
}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!error && onSubmit) {
        onSubmit(values);
      }
    });
  };

  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  if (!formItems || formItems.length === 0) return null;
  return (
    <Form onSubmit={handleSubmit} labelAlign={labelAlign} colon={colon}>
      <Row gutter={24}>
        {formItems.map(item => {
          const { name, formLabel, decoratorOptions, required } = item;

          return (
            <Col key={name} span={getSpan(columns, item.columns)}>
              <Form.Item label={formLabel} required={required} {...getLayout(columns, item.columns)}>
                {getFieldDecorator(name, decoratorOptions)(renderFormItemComponent(item))}
              </Form.Item>
            </Col>
          );
        })}
        <Col span={24}>
          <Form.Item className={buttonClassName}>
            <Button type="primary" htmlType="submit">
              {submitText}
            </Button>
            <Button type="default" htmlType="reset" onClick={handleReset}>
              {resetText}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<FormCreatorProps>()(FormCreator);

/**
 * 根据Form的columns和表单项的columns来生成Col的span。
 * @param columns
 * @param itemColumns
 */
function getSpan(columns: number, itemColumns: number = 1) {
  let span = Math.floor(24 / columns);
  if (itemColumns) {
    span = Math.floor(24 / itemColumns);
  }
  return span;
}

/**
 * 根据Form的columns和表单项的columns得到formItem的布局
 * @param columns
 * @param itemColumns
 */
function getLayout(columns: number, itemColumns: number = 1) {
  if (itemColumns) {
    return formItemLayout[itemColumns];
  }
  return formItemLayout[columns];
}

/**
 * 生成placeholder
 * @param formLabel
 * @param type
 * @param placeholder
 */
function getPlaceholder(formLabel: string, type: FormItemType, placeholder?: string | [string, string]) {
  if (placeholder && typeof placeholder === 'string') {
    return placeholder;
  } else {
    return `${getPrefixByType(type)}${formLabel}`;
  }
}

/**
 * 根据表单项的type得到placeholder或者message的前缀文案
 * @param type
 */
// eslint-disable-next-line complexity
export function getPrefixByType(type: FormItemType) {
  let prefix = '';
  switch (type) {
    case 'checkbox':
    case 'radio':
    case 'datepicker':
    case 'rangepicker':
    case 'select':
    case 'treeselect':
      prefix = '请选择';
      break;
    case 'upload':
      prefix = '请上传';
      break;
    case 'input':
    case 'number':
    case 'textarea':
    case 'richeditor':
    default:
      prefix = '请输入';
      break;
  }
  return prefix;
}

/**
 * 根据表单项的配置匹配对应的表单组件
 * @param item
 */
// eslint-disable-next-line complexity
export function renderFormItemComponent(item: FormItemProps) {
  const { formLabel, type, dataSource } = item;
  const placeholder = getPlaceholder(formLabel, type, item.placeholder);

  switch (type) {
    case 'input':
    default:
      return <Input placeholder={placeholder} />;
    case 'number':
      return <InputNumber placeholder={placeholder} style={{ width: '100%' }} />;
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
      return <DatePicker placeholder={placeholder} style={{ width: '100%' }} />;
    case 'rangepicker':
      return <RangePicker placeholder={item.placeholder as [string, string]} />;
    case 'treeselect':
      return <TreeSelect treeData={dataSource as TreeNode[]} />;
    case 'textarea':
      return <Input.TextArea rows={4} placeholder={placeholder} />;
    case 'upload':
      return <Upload {...item.uploadProps}>{item.uploadChildren}</Upload>;

    case 'richeditor':
      return <RichEditor mediaType={item.mediaType} />;
  }
}
