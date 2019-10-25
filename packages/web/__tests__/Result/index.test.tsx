import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';
import Result from '../../components/result';
import { Modal, Button } from 'antd';

const ResultTester = () => {
  const [visible, toggleVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => toggleVisible(true)}>打开结果页</Button>
      <Result visible={visible} onClose={() => toggleVisible(!visible)} />
    </div>
  );
};

describe('测试Result操作结果弹窗组件', () => {
  it('1. 可以正常渲染Result组件', () => {
    const wrapper = shallow(<Result onClose={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('2. Result组件默认不显示', () => {
    const wrapper = mount(<Result onClose={() => {}} />);
    expect(wrapper.prop('visible')).toBeFalsy();
  });
  it('3. Result组件默认的类型是success', () => {
    const wrapper = mount(<Result onClose={() => {}} />);
    expect(wrapper.prop('success')).toBeTruthy();
  });
  it('4. Result组件默认的主文案是操作成功', () => {
    const wrapper = shallow(<Result onClose={() => {}} />);
    expect(wrapper.find('.td-result-content-text').text()).toEqual('操作成功');
  });
  it('5. Result组件可以接收指定的属性', () => {
    const wrapper = shallow(
      <Result onClose={() => {}} visible={true} success={false} text="操作失败" subtext="请检查您提交的数据" />,
    );
    expect(wrapper.prop('visible')).toBeTruthy();
    expect(wrapper.find('.td-result-content-text').text()).toEqual('操作失败');
    expect(wrapper.find('.td-result-content-subtext').text()).toEqual('请检查您提交的数据');
  });
  it('6. Result组件内有一个Modal组件', () => {
    const wrapper = shallow(<Result onClose={() => {}} />);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });
  it('7. Result组件有默认的样式', () => {
    const wrapper = shallow(<Result onClose={() => {}} />);
    expect(wrapper.find(Modal).prop('width')).toBe(520);
  });
  it('8. 可以通过父组件打开Result组件', () => {
    const wrapper = mount(<ResultTester />);
    wrapper.find(Button).simulate('click');
    expect(wrapper.find(Result).prop('visible')).toBeTruthy();
  });

  it('9. Result组件的onClose方法可以正常触发', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Result visible={true} onClose={onClose} />);
    wrapper.find('button.ant-modal-close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
