import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../components/Container';
import { Skeleton, Center } from '@td-design/react-native';

const secondLayout = [
  {
    width: '50%',
    height: '10%',
  },
  {
    width: 240,
    height: 60,
    marginTop: 20,
  },
];
const thirdLayout = [
  {
    width: 220,
    height: 20,
    marginBottom: 8,
  },
  {
    width: 180,
    height: 20,
  },
];

export default function SkeletonDemo() {
  return (
    <Container>
      <Center>
        <Skeleton
          containerStyle={styles.titleContainer}
          styles={secondLayout}
          loading={true}
          animationDirection="horizontalRight"
        >
          <View>
            <Text style={styles.bigText}>Benjamin Franklin</Text>
          </View>
          <Text style={[styles.normalText, { marginTop: 20 }]}>An investment in knowledge pays the best interest.</Text>
        </Skeleton>
        <Skeleton
          boneColor="#121212"
          highlightColor="#333333"
          animationType="pulse"
          styles={thirdLayout}
          containerStyle={styles.descContainer}
          loading={true}
        >
          <Text style={styles.normalText}>“It is easier to prevent bad habits than to break them.“</Text>
        </Skeleton>
      </Center>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: 300,
    padding: 20,
  },
  descContainer: {
    width: 300,
    padding: 20,
  },
  normalText: {
    fontSize: 18,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
});
