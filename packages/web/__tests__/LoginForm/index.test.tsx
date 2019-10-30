import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from '../../components/login-form';

describe('测试LoginForm组件', () => {
  it('1. 成功渲染', () => {
    const wrapper = shallow(<LoginForm placeholder="请输入手机号码" onSubmit={() => {}} phone />);
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 测试placeholder属性', () => {
    const wrapper = mount(<LoginForm placeholder="请输入手机号码" onSubmit={() => {}} phone />);
    expect(wrapper.find('input.phone').prop('placeholder')).toEqual('请输入手机号码');
  });

  it('3. 测试onSubmit方法是否被传入', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<LoginForm placeholder="请输入手机号码" onSubmit={onSubmit} phone />);
    expect(wrapper.props().onSubmit).toBeDefined();
  });

  it('4. 测试用户名登录', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<LoginForm placeholder="请输入用户名" onSubmit={onSubmit} />);
    expect(
      wrapper
        .find('input')
        .at(0)
        .hasClass('userName'),
    ).toBe(true);
  });

  it('5. 测试手机号登录', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<LoginForm placeholder="请输入手机号码" onSubmit={onSubmit} phone />);
    expect(
      wrapper
        .find('input')
        .at(0)
        .hasClass('phone'),
    ).toBe(true);
  });

});
