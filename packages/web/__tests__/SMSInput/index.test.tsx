import React from 'react';
import { shallow, mount } from 'enzyme';
import SMSInput from '../../components/sms-input';

describe('测试SMSInput组件', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('1. 成功渲染', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: 60 });
    const wrapper = shallow(<SMSInput type={1} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 测试一开始的展示文字', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: 60 });
    const wrapper = mount(<SMSInput type={1} phone="123456789" />);
    expect(wrapper.find('a').text()).toBe('获取验证码');
  });
});
