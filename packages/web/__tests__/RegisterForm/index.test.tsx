import React from 'react';
import { shallow, mount } from 'enzyme';
import RegisterForm from '../../components/register-form';

describe('测试RegisterForm组件', () => {
  it('1. 成功渲染', () => {
    const wrapper = shallow(<RegisterForm afterSubmit={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 测试afterSubmit是否被传入', () => {
    const afterSubmit = jest.fn();
    const wrapper = mount(<RegisterForm afterSubmit={afterSubmit} />);
    expect(wrapper.props().afterSubmit).toBeDefined();
  });

  it('3. 测试是否渲染出四个input', () => {
    const wrapper = mount(<RegisterForm afterSubmit={() => {}} />);
    expect(wrapper.find('input').length).toBe(4);
  });

  it('4. 测试第二个input为password类型', () => {
    const wrapper = mount(<RegisterForm afterSubmit={() => {}} />);
    expect(
      wrapper
        .find('input')
        .at(1)
        .props().type,
    ).toBe('password');
  });
});
