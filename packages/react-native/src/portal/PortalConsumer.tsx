import React, { PropsWithChildren } from 'react';

import { PortalMethods } from './PortalContext';

export default class PortalConsumer extends React.Component<PropsWithChildren<{ manager: PortalMethods }>> {
  private key: any;

  componentDidMount() {
    this.checkManager();

    this.key = this.props.manager.mount(this.props.children);
  }

  componentDidUpdate() {
    this.props.manager.update(this.key, this.props.children);
  }

  componentWillUnmount() {
    this.props.manager.unmount(this.key);
  }

  private checkManager() {
    if (!this.props.manager) {
      throw new Error('你好像忘记用Portal.Provider包裹你的应用了。');
    }
  }

  render() {
    return null;
  }
}
