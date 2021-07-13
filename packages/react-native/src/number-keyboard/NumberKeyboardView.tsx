import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { SvgXml } from 'react-native-svg';
import helpers from '../helpers';
import { Theme } from '../theme';
import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import { NumberKeyboardProps } from './type';

const { px, ONE_PIXEL } = helpers;
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const keyTypes = {
  number: [
    {
      key: '0',
      flex: 2,
    },
    {
      key: '.',
      flex: 1,
    },
  ],
  IdCard: [
    {
      key: '0',
      flex: 2,
    },
    {
      key: 'x',
      flex: 1,
    },
  ],
  integer: [
    {
      key: '0',
      flex: 1,
    },
  ],
};

const NumberKeyboardView: FC<NumberKeyboardProps> = ({ type = 'number', onPress, onDelete, onSubmit }) => {
  const theme = useTheme<Theme>();

  return (
    <Flex height={px(264)} backgroundColor="background">
      <Box width={px(283)}>
        <Flex flexWrap="wrap">
          {keys.map(item => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item}
                onPress={() => {
                  onPress?.(item);
                }}
                style={{
                  flex: 1,
                  minWidth: px(94),
                  height: px(66),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: ONE_PIXEL,
                  borderRightWidth: ONE_PIXEL,
                  borderColor: theme.colors.border,
                }}
              >
                <Text variant="h0" color="gray500">
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Flex>
        <Box flex={1} flexDirection="row">
          {keyTypes[type].map((item: { key: string; flex: number }) => {
            return (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.8}
                onPress={() => {
                  onPress?.(item.key);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: item.flex,
                  borderTopWidth: ONE_PIXEL,
                  borderRightWidth: ONE_PIXEL,
                  borderBottomWidth: ONE_PIXEL,
                  borderColor: theme.colors.border,
                }}
              >
                <Text variant="h0" color="gray500">
                  {item.key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Box>
      </Box>
      <Box flex={1}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: ONE_PIXEL,
            borderRightWidth: ONE_PIXEL,
            borderColor: theme.colors.border,
            flex: 1,
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
            width={px(26)}
            height={px(17)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: theme.colors.primary200,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: ONE_PIXEL,
            borderRightWidth: ONE_PIXEL,
            borderColor: theme.colors.border,
            flex: 1,
          }}
          onPress={() => {
            onSubmit?.();
          }}
        >
          <Text variant="h1" color="white">
            确定
          </Text>
        </TouchableOpacity>
      </Box>
    </Flex>
  );
};

export default NumberKeyboardView;
