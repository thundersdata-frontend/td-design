import React, { useState } from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
import { FormCreatorProps, renderFormItemComponent } from '../form-creator';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const itemLayout = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 12 },
  lg: { span: 8 },
  xl: { span: 6 },
  xxl: { span: 6 },
};

export type FilterFormProps = Omit<FormCreatorProps, 'columns'>;

const FilterForm: React.FC<FilterFormProps> = ({
  formItems,
  onSubmit,
  onReset,
  submitText = '查询',
  resetText = '重置',
  labelAlign = 'right',
  form,
}) => {
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

  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  if (!formItems || formItems.length === 0) return null;
  if (formItems.length <= 4) {
    return (
      <Form onSubmit={handleSubmit} {...formItemLayout} labelAlign={labelAlign}>
        <Row gutter={24}>
          {formItems.map((item, index) => (
            <Col key={index} {...itemLayout}>
              <Form.Item label={item.formLabel}>
                {getFieldDecorator(item.name)(renderFormItemComponent(item))}
              </Form.Item>
            </Col>
          ))}
          <Col {...itemLayout}>
            <Form.Item label="">
              <Button type="primary" htmlType="submit">
                {submitText}
              </Button>
              <span style={{ paddingLeft: 8 }} />
              <Button type="default" htmlType="reset" onClick={handleReset}>
                {resetText}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  const count = collapsed ? 3 : formItems.length;
  return (
    <Form onSubmit={handleSubmit} {...formItemLayout} labelAlign={labelAlign}>
      <Row gutter={24}>
        {formItems.map((item, index) => (
          <Col key={index} {...itemLayout} style={{ display: index < count ? 'block' : 'none' }}>
            <Form.Item label={item.formLabel}>{getFieldDecorator(item.name)(renderFormItemComponent(item))}</Form.Item>
          </Col>
        ))}
        <Col {...itemLayout}>
          <Form.Item label="" {...{ wrapperCol: { span: 24 } }}>
            <Button type="primary" htmlType="submit">
              {submitText}
            </Button>
            <span style={{ paddingLeft: 8 }} />
            <Button type="default" htmlType="reset" onClick={handleReset}>
              {resetText}
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
