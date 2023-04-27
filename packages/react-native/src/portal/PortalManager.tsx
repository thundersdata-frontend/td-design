import React from 'react';
import { StyleSheet } from 'react-native';

import Box from '../box';

type State = {
  portals: Array<{
    key: number;
    children: React.ReactNode;
  }>;
};

export default class PortalManager extends React.PureComponent<{}, State> {
  state: State = {
    portals: [],
  };

  mount = (key: number, children: React.ReactNode) => {
    this.setState(state => ({
      portals: [...state.portals, { key, children }],
    }));
  };

  update = (key: number, children: React.ReactNode) =>
    this.setState(state => ({
      portals: state.portals.map(item => {
        if (item.key === key) {
          return { ...item, children };
        }
        return item;
      }),
    }));

  unmount = (key: number) =>
    this.setState(state => ({
      portals: state.portals.filter(item => item.key !== key),
    }));

  render() {
    return this.state.portals.map(({ key, children }) => (
      <Box
        key={key}
        collapsable={
          false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
        }
        style={StyleSheet.absoluteFill}
      >
        {children}
      </Box>
    ));
  }
}