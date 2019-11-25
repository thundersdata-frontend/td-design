import React from 'react';
import { shallow, mount } from 'enzyme';
import SMSForm from '../../components/sms-form';

describe('测试SMSForm组件', () => {
  it('1. 成功渲染', () => {
    const wrapper = shallow(<SMSForm afterSubmit={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 测试afterSubmit是否被传入', () => {
    const afterSubmit = jest.fn();
    const wrapper = mount(<SMSForm afterSubmit={afterSubmit} />);
    expect(wrapper.props().afterSubmit).toBeDefined();
  });

  it('3. 测试是否渲染出两个input', () => {
    const wrapper = mount(<SMSForm afterSubmit={() => {}} />);
    expect(wrapper.find('input').length).toBe(2);
  });
});
