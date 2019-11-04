import React from 'react';
import { shallow ,mount} from 'enzyme';
import CheckCode from '../../components/sms-input';

describe('测试CheckCode组件', () => {
  it('1. 成功渲染', () => {
    const wrapper = shallow(<CheckCode type={1}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 测试一开始的展示文字', () => {
    const wrapper = mount(<CheckCode type={1} phone='123456789'/>);
    expect( wrapper.find('a').text()).toBe('获取验证码')
  });
  
})