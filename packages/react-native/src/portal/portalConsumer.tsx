import React, { PropsWithChildren } from 'react';

import type { PortalMethods } from './PortalHost';

type Props = {
  manager: PortalMethods;
};

export default class PortalConsumer extends React.Component<PropsWithChildren<Props>> {
  private key: any;

  componentDidMount() {
    this.checkManager();

    this.key = this.props.manager.mount(this.props.children);
  }

  componentDidUpdate() {
    this.checkManager();

    this.props.manager.update(this.key, this.props.children);
  }

  componentWillUnmount() {
    this.checkManager();

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
