import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button, message } from 'antd';
import ProcessNode from '../../components/process-node';
import imageUrl from '../../components/process-node/baseImage';

describe('测试ProcessNode组件', () => {
  it('1. 可以成功渲染', () => {
    const wrapper = shallow(
      <ProcessNode title="标题" subtitle="副标题" imageUrl={imageUrl} onRemove={() => message.success('点击了移除')} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('2. 可以接收title属性', () => {
    const wrapper = shallow(<ProcessNode title="标题" />);
    expect(wrapper.find('div.td-process-node-title').text()).toEqual('标题');
  });

  it('3. title属性可以是任何React组件或者DOM节点', () => {
    const wrapper = shallow(
      <ProcessNode
        title={
          <div>
            <span className="test">测试</span>
            <Button>按钮</Button>
          </div>
        }
      />,
    );
    expect(wrapper.find('span.test').text()).toEqual('测试');
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('4. 可以接收subtitle属性', () => {
    const wrapper = mount(<ProcessNode title="标题" subtitle="副标题" />);
    expect(wrapper.props().subtitle).toEqual('副标题');
  });

  it('5. subtitle属性可以是任何React组件或者DOM节点', () => {
    const wrapper = shallow(
      <ProcessNode
        title="标题"
        subtitle={
          <div>
            <span className="test">测试</span>
            <Button>按钮</Button>
          </div>
        }
      />,
    );
    expect(wrapper.find('span.test').text()).toEqual('测试');
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('6. 可以接收imageUrl属性', () => {
    const wrapper = mount(<ProcessNode title="标题" imageUrl={imageUrl} />);
    expect(wrapper.props().imageUrl).toEqual(imageUrl);
  });

  it('7. 有默认的imageUrl属性', () => {
    const wrapper = shallow(<ProcessNode title="标题" />);
    expect(wrapper.find('img').prop('src')).toEqual(imageUrl);
  });

  it('8. 可以接收并执行onRemove函数', () => {
    let isRemove = false;
    const wrapper = shallow(
      <ProcessNode title="标题" subtitle="副标题" imageUrl={imageUrl} onRemove={() => (isRemove = true)} />,
    );
    wrapper.find('Icon').simulate('click');
    expect(isRemove).toBe(true);
  });
});
