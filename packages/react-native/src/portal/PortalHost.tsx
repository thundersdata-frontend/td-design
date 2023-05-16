import React, { PropsWithChildren } from 'react';
import { EventSubscription, View } from 'react-native';

import { PortalContext, PortalMethods } from './PortalContext';
import { ADD_TYPE, REMOVE_TYPE, TopViewEventEmitter } from './PortalGuard';
import PortalManager from './PortalManager';

type Operation =
  | { type: 'mount'; key: number; children: React.ReactNode }
  | { type: 'update'; key: number; children: React.ReactNode }
  | { type: 'unmount'; key: number };

export default class PortalHost extends React.Component<PropsWithChildren<{}>> {
  static displayName = 'Portal.Host';

  private nextKey = 0;
  private queue: Operation[] = [];
  private manager: PortalManager | null | undefined;

  private addListener: EventSubscription | undefined;
  private removeListener: EventSubscription | undefined;

  componentDidMount() {
    const manager = this.manager;
    const queue = this.queue;

    this.addListener = TopViewEventEmitter.addListener(ADD_TYPE, this.mount);
    this.removeListener = TopViewEventEmitter.addListener(REMOVE_TYPE, this.unmount);

    while (queue.length && manager) {
      const action = queue.pop();
      if (!action) {
        continue;
      }

      switch (action.type) {
        case 'mount':
          manager.mount(action.key, action.children);
          break;

        case 'update':
          manager.update(action.key, action.children);
          break;

        case 'unmount':
          manager.unmount(action.key);
          break;

        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    this.addListener?.remove();
    this.removeListener?.remove();
  }

  private setManager = (manager: PortalManager | undefined | null) => {
    this.manager = manager;
  };

  private mount = (children: React.ReactNode, _key?: number) => {
    const key = _key || this.nextKey++;

    if (this.manager) {
      this.manager.mount(key, children);
    } else {
      this.queue.push({ type: 'mount', key, children });
    }

    return key;
  };

  private update = (key: number, children: React.ReactNode) => {
    if (this.manager) {
      this.manager.update(key, children);
    } else {
      const op: Operation = { type: 'mount', key, children };
      const index = this.queue.findIndex(o => o.type === 'mount' || (o.type === 'update' && o.key === key));

      if (index > -1) {
        this.queue[index] = op;
      } else {
        this.queue.push(op as Operation);
      }
    }
  };

  private unmount = (key: number) => {
    if (this.manager) {
      this.manager.unmount(key);
    } else {
      this.queue.push({ type: 'unmount', key });
    }
  };

  render() {
    const manager: PortalMethods = {
      mount: this.mount,
      update: this.update,
      unmount: this.unmount,
    };

    return (
      <PortalContext.Provider value={manager}>
        <View style={{ flex: 1 }} collapsable={false}>
          {this.props.children}
        </View>
        <PortalManager ref={this.setManager} />
      </PortalContext.Provider>
    );
  }
}
