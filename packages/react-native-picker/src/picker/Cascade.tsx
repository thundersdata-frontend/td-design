import React from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import arrayTreeFilter from 'array-tree-filter';
import { Flex, Modal, helpers, Text } from '@td-design/react-native';

import WheelPicker from './WheelPicker';
import { PickerProps, ItemValue, ModalPickerProps, CascadePickerItemProps } from './type';

const { px, ONE_PIXEL } = helpers;

type CascaderProps = Omit<PickerProps, 'data'> & {
  data: CascadePickerItemProps[];
} & ModalPickerProps;

export default class Cascader extends React.Component<CascaderProps, { value: ItemValue[] }> {
  static defaultProps = {
    cols: 3,
    data: [],
    disabled: false,
  };

  generateNextValue = (data: CascadePickerItemProps[], value?: ItemValue[]): ItemValue[] => {
    let d = data;
    let level = 0;
    const nextValue: ItemValue[] = [];

    if (value && value.length) {
      do {
        const index = d.findIndex(item => item.value + '' === value[level] + '');

        if (index < 0) {
          break;
        }

        nextValue[level] = value[level] + '';
        level += 1;
        d = d[index].children || [];
      } while (d.length > 0);
    }

    for (let i = level; i < this.props.cols!; i++) {
      if (d && d.length) {
        nextValue[i] = d[0].value! + '';
        d = d[0].children || [];
      } else {
        break;
      }
    }
    return nextValue;
  };

  constructor(props: CascaderProps) {
    super(props);

    this.state = {
      value: this.generateNextValue(props.data, props.value),
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.visible);
  }

  UNSAFE_componentWillReceiveProps(nextProps: CascaderProps) {
    if ('value' in nextProps) {
      this.setState({
        value: this.generateNextValue(nextProps.data, nextProps.value),
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.visible);
  }

  onValueChange = (value: ItemValue, index: number) => {
    const newValue = [...this.state.value];
    // 修改当前的值，然后把后面的值都清掉
    newValue[index] = value + '';
    newValue.length = index + 1;
    const nextValue = this.generateNextValue(this.props.data, newValue);
    this.setState({
      value: nextValue,
    });
  };

  getValue = () => {
    return this.state.value;
  };

  getCols = () => {
    const { data, cols, style, ...restProps } = this.props;
    const value = this.state.value;
    const childrenTree = arrayTreeFilter(data, (c, level) => {
      return c.value + '' === value[level] + '';
    }).map(c => c.children);

    // in case the users data is async get when select change
    const needPad = cols! - childrenTree.length;
    if (needPad > 0) {
      for (let i = 0; i < needPad; i++) {
        childrenTree.push([]);
      }
    }
    childrenTree.length = cols! - 1;
    childrenTree.unshift(data);
    return childrenTree.map((item: CascadePickerItemProps[] = [], level) => (
      <Flex.Item key={level}>
        <WheelPicker
          {...restProps}
          {...{ data: item.map(el => ({ ...el, value: `${el.value}` })), value: `${this.state.value[level]}` }}
          onChange={val => this.onValueChange(val, level)}
          style={[{ height: px(220) }, style]}
        />
      </Flex.Item>
    ));
  };

  handleClose = () => {
    this.props.onClose?.();
  };

  handleOk = () => {
    this.props.onChange?.(this.state.value);
    this.props.onClose?.();
  };

  render() {
    const props = this.props;
    const { visible = false, displayType = 'modal', cancelText = '取消', okText = '确定', title } = props;
    const cols = this.getCols();

    const PickerComp = <Flex backgroundColor="background">{cols}</Flex>;

    if (displayType === 'modal') {
      return (
        <Modal visible={visible} onClose={this.handleClose}>
          <Flex
            height={px(50)}
            borderBottomWidth={ONE_PIXEL}
            borderBottomColor="border"
            backgroundColor="background"
            paddingHorizontal="x3"
          >
            <Flex.Item alignItems="flex-start">
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.handleClose}
                style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}
              >
                <Text variant="p0" color="primary200">
                  {cancelText}
                </Text>
              </TouchableOpacity>
            </Flex.Item>
            <Flex.Item alignItems="center">
              <Text variant="p0" color="gray500">
                {title}
              </Text>
            </Flex.Item>
            <Flex.Item alignItems="flex-end">
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.handleOk}
                style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
              >
                <Text variant="p0" color="primary200">
                  {okText}
                </Text>
              </TouchableOpacity>
            </Flex.Item>
          </Flex>
          {PickerComp}
        </Modal>
      );
    }
    return PickerComp;
  }
}
