import React, { FC } from 'react';
import Box from '../box';
import { px, ONE_PIXEL } from '../helper';
import Flex from '../flex';
import Icon from '../icon';
import Text from '../text';
import { TouchableOpacity } from 'react-native';
import { EventDataNode, DataNode } from './type';

export interface TreeNodeProps {
  eventKey?: string; // Pass by parent `cloneElement`

  // By parent
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  title?: React.ReactNode | ((data: DataNode) => React.ReactNode);
  /** New added in Tree for easy data access */
  data: DataNode;
  active?: boolean;

  // By user
  level: number;
  checkable?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  children?: React.ReactNode;
  onClick?: (data: EventDataNode) => void;
  onCheck?: (data: EventDataNode) => void;
}
const TreeItem: FC<TreeNodeProps> = ({
  checkable = true,
  selected = false,
  expanded = false,
  eventKey,
  title,
  checked = false,
  disabled,
  onClick,
  onCheck,
  data,
  children,
  level,
}) => {
  const iconRender = (checked: boolean) => {
    return (
      <Icon
        size={px(16)}
        type="material"
        name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
        ratio={1}
      />
    );
  };
  const switcherIconRender = () => {
    return <Icon size={px(10)} name="down" ratio={1} />;
  };

  const handlerCheck = () => {
    onCheck?.({ expanded, key: data.key, eventKey, title, checked, disabled });
  };

  return (
    <Box
      height={px(55)}
      backgroundColor="white"
      borderBottomWidth={ONE_PIXEL}
      borderBottomColor="borderColor"
      paddingHorizontal="m"
    >
      <Flex alignItems="center" flex={1} style={{ marginLeft: (level - 1) * px(16) }}>
        <TouchableOpacity disabled={disabled} onPress={handlerCheck}>
          {checkable && iconRender(checked)}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, marginLeft: px(3) }}
          onPress={() => {
            onClick?.({ expanded, key: data.key, title, checked, disabled });
          }}
        >
          <Text variant={disabled ? 'secondaryTip' : 'secondaryBody'}>{title}</Text>
        </TouchableOpacity>
        {switcherIconRender()}
      </Flex>
    </Box>
  );
};

export default TreeItem;
