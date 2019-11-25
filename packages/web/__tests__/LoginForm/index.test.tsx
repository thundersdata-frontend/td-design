import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from '../../components/login-form';

describe('测试LoginForm组件', () => {
  it('1. 成功渲染', () => {
    const wrapper = shallow(<LoginForm afterSubmit={() => {}} phone />);
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 测试afterSubmit方法是否被传入', () => {
    const afterSubmit = jest.fn();
    const wrapper = mount(<LoginForm afterSubmit={afterSubmit} phone />);
    expect(wrapper.props().afterSubmit).toBeDefined();
  });

  it('3. 测试用户名登录', () => {
    const wrapper = mount(<LoginForm afterSubmit={() => {}} />);
    expect(
      wrapper
        .find('input')
        .at(0)
        .props().placeholder,
    ).toBe('请输入用户名');
  });

  it('4. 测试手机号登录', () => {
    const wrapper = mount(<LoginForm afterSubmit={() => {}} phone />);
    expect(
      wrapper
        .find('input')
        .at(0)
        .props().placeholder,
    ).toBe('请输入手机号码');
  });
});
