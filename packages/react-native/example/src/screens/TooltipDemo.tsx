import React, { useRef } from 'react';
import { Tooltip, Text, Flex, Button } from '@td-design/react-native';
import Container from '../components/Container';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TooltipRef } from '../../tooltip';

export default () => {
  const tooltipRef = useRef<TooltipRef>(null);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20, justifyContent: 'space-between', flex: 1 }}>
        <View>
          <Flex justifyContent="space-between">
            <Tooltip title="InfoInfoInfo" backgroundColor="red">
              <Text variant="p0" color="primary200">
                press me
              </Text>
            </Tooltip>
            {/* <Tooltip
              title={
                <Text variant="p1" color="primary200">
                  InfoInfoInfoInfoInfo Info
                </Text>
              }
              width={200}
            >
              <Text variant="p0" color="primary200">
                1111111
              </Text>
            </Tooltip> */}
          </Flex>
        </View>
        {/* <View>
          <Flex justifyContent="space-around">
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
              withOverlay={false}
            >
              <Text variant="p0" color="primary200">
                press me
              </Text>
            </Tooltip>
            <Tooltip
              title={
                <Text variant="p1" color="primary200">
                  InfoInfoInfoInfoInfo Info
                </Text>
              }
              width={200}
            >
              <Text variant="p0" color="primary200">
                111
              </Text>
            </Tooltip>
          </Flex>
        </View> */}

        {/* <View>
          <Flex justifyContent="space-around">
            <Tooltip
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
            >
              <Text variant="p0" color="primary200">
                press me
              </Text>
            </Tooltip>
            <Tooltip
              title={
                <Text variant="p1" color="primary200">
                  InfoInfoInfoInfoInfo Info
                </Text>
              }
              width={200}
            >
              <Text variant="p0" color="primary200">
                111
              </Text>
            </Tooltip>
          </Flex>
        </View> */}
        <View>
          <Flex justifyContent="space-around">
            <Tooltip
              ref={tooltipRef}
              title="InfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo InfoInfoInfoInfoInfoInfo Info"
              width={200}
              height={60}
            >
              <Text variant="p0" color="primary200">
                press me
              </Text>
            </Tooltip>
            <Button
              title="显示"
              width={80}
              onPress={() => {
                tooltipRef?.current?.show();
                setTimeout(() => {
                  tooltipRef?.current?.close();
                }, 3000);
              }}
            ></Button>
            <Button
              title="隐藏"
              width={80}
              onPress={() => {
                tooltipRef?.current?.close();
              }}
            ></Button>
          </Flex>
        </View>
      </ScrollView>
    </Container>
  );
};
