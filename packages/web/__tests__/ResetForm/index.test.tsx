import React from 'react';
import { shallow, mount } from 'enzyme';
import ResetForm from '../../components/reset-form';

describe('测试ResetForm组件', () => {
  it('1. 成功渲染', () => {
    const wrapper = shallow(<ResetForm onSubmit={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 测试onSubmit是否被传入', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<ResetForm onSubmit={onSubmit} />);
    expect(wrapper.props().onSubmit).toBeDefined();
  });

  it('3. 测试是否渲染出四个input', () => {
    const wrapper = mount(<ResetForm onSubmit={() => {}} />);
    expect(wrapper.find('input').length).toBe(4);
  });

  it('4. 测试第二个input为text类型', () => {
    const wrapper = mount(<ResetForm onSubmit={() => {}} />);
    expect(
      wrapper
        .find('input')
        .at(1)
        .props().type,
    ).toBe('text');
  });
});
