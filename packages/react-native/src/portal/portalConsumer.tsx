import React from 'react';

import type { PortalMethods } from './portalHost';

type Props = {
  manager: PortalMethods;
  children: React.ReactNode;
};

export default class PortalConsumer extends React.Component<Props> {
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

  private key: any;

  private checkManager() {
    if (!this.props.manager) {
      throw new Error('您好像忘记使用Portal.Host包裹您的应用了。建议您使用ThemeProvider，它内置了Portal.Host');
    }
  }

  render() {
    return null;
  }
}
