import React, { ReactNode } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';

type Portal = { key: number; children: ReactNode };
type PortalManagerState = { portals: Portal[] };
export default class PortalManager extends React.Component<unknown, PortalManagerState> {
  state: PortalManagerState = {
    portals: [],
  };

  public mount = ({ key, children }: { key: number; children: ReactNode }) => {
    this.setState(state => ({
      portals: [...state.portals, { key, children }],
    }));
  };

  public update = ({ key, children }: { key: number; children: ReactNode }) => {
    this.setState(state => ({
      portals: state.portals.map(item => {
        if (item.key === key) {
          return { ...item, children };
        }
        return item;
      }),
    }));
  };

  public unmount = (key: number) => {
    this.setState(state => ({
      portals: state.portals.filter(item => item.key !== key),
    }));
  };

  private backHandler = () => {
    const _portals = this.state.portals.slice();
    if (_portals.length > 0) {
      _portals.pop();
      this.setState({
        portals: _portals,
      });
      if (_portals.length > 0) {
        return true;
      }
      return false;
    }
    return false;
  };

  public componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  public render() {
    return (
      <>
        {this.state.portals.map(portal => (
          <View
            key={portal.key}
            collapsable={false}
            pointerEvents="box-none"
            style={[StyleSheet.absoluteFill, { zIndex: 1000 + portal.key }]}
          >
            {portal.children}
          </View>
        ))}
      </>
    );
  }
}
