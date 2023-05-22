import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardProps } from './type';

const { px } = helpers;

const provinces = [
  '京',
  '津',
  '冀',
  '鲁',
  '晋',
  '蒙',
  '辽',
  '吉',
  '黑',
  '沪',
  '苏',
  '浙',
  '皖',
  '闽',
  '赣',
  '豫',
  '鄂',
  '湘',
  '粤',
  '桂',
  '渝',
  '川',
  '贵',
  '云',
  '藏',
  '陕',
  '甘',
  '琼',
  '新',
  '宁',
  '青',
  '使',
  '领',
  'del',
];
const vehicleNum = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '挂',
  '学',
  '警',
  '港',
  '澳',
  'del',
];

const keys = {
  provinces,
  vehicleNum,
};

const VehicleKeyboardView: FC<VehicleKeyboardProps> = ({ type = 'provinces', onPress, onDelete }) => {
  const theme = useTheme<Theme>();

  return (
    <Box backgroundColor="background">
      <Flex flexWrap="wrap">
        {keys[type].map(item => {
          return item != 'del' ? (
            <TouchableOpacity
              key={item}
              activeOpacity={0.2}
              onPress={() => {
                onPress?.(item);
              }}
              style={{
                width: px(29),
                height: px(29),
                margin: px(4),
                backgroundColor: 'white',
                borderRadius: px(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text variant="h2" color="gray500">
                {item}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key="del"
              activeOpacity={0.5}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                width: px(29),
                height: px(29),
                margin: px(4),
                borderRadius: px(4),
                marginLeft: 'auto',
                backgroundColor: 'white',
              }}
              onPress={() => {
                onDelete?.();
              }}
            >
              <SvgXml
                xml={`
                  <svg
                    t="1607517664521"
                    class="icon"
                    viewBox="0 0 1579 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7769"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M1473.619354 0H499.942734a122.427628 122.427628 0 0 0-94.06463 44.818325L13.044586 478.700403A58.162099 58.162099 0 0 0 15.557763 554.99328l397.261497 437.292818a101.065623 101.065623 0 0 0 72.941974 31.654064h987.85812a109.323205 109.323205 0 0 0 106.331327-111.477356V111.297844A109.263367 109.263367 0 0 0 1473.619354 0z m4.787004 823.544206a87.602174 87.602174 0 0 1-88.021037 86.584936H529.981184a86.345585 86.345585 0 0 1-60.256413-24.533396L141.276456 545.419272a43.083036 43.083036 0 0 1-2.154151-59.239175l324.738386-337.364109a103.638637 103.638637 0 0 1 77.788815-34.825454h849.09484a87.602174 87.602174 0 0 1 88.021037 86.584935v622.968737z"
                      fill="${theme.colors.gray500}"
                      p-id="7770"
                    ></path>
                    <path
                      d="M1192.562379 665.453398a56.965348 56.965348 0 1 1-80.541342 80.541343l-151.508678-151.508678-147.080699 147.260212a56.965348 56.965348 0 0 1-80.541343-80.541343l147.260212-147.260212-151.748028-151.508677a56.90551 56.90551 0 0 1 80.36183-80.541343l151.508678 151.508678 155.577631-155.577631a56.90551 56.90551 0 0 1 80.541343 80.36183l-155.577631 155.577631z"
                      fill="${theme.colors.gray500}"
                      p-id="7771"
                    ></path>
                  </svg>`}
                width={px(22)}
                height={px(14)}
              />
            </TouchableOpacity>
          );
        })}
      </Flex>
    </Box>
  );
};

VehicleKeyboardView.displayName = 'VehicleKeyboardView';

export default VehicleKeyboardView;
