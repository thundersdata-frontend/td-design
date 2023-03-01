import React, { PropsWithChildren } from 'react';

import PortalConsumer from './PortalConsumer';
import PortalHost, { portal, PortalContext } from './PortalHost';

class Portal extends React.Component<PropsWithChildren<{}>> {
  static Host = PortalHost;
  static add = portal.add;
  static remove = portal.remove;

  render() {
    const { children } = this.props;

    return (
      <PortalContext.Consumer>
        {manager => <PortalConsumer manager={manager}>{children}</PortalConsumer>}
      </PortalContext.Consumer>
    );
  }
}

export default Portal;
