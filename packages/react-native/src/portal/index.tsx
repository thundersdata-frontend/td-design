/** this component is totally copied from react-native-paper */
import React, { PropsWithChildren } from 'react';

import PortalConsumer from './portalConsumer';
import PortalHost, { PortalContext, PortalMethods } from './portalHost';

export default class Portal extends React.Component<PropsWithChildren> {
  static displayName = 'Portal';
  static Host = PortalHost;
  static Context = PortalContext;

  render() {
    return (
      <PortalContext.Consumer>
        {manager => <PortalConsumer manager={manager as PortalMethods}>{this.props.children}</PortalConsumer>}
      </PortalContext.Consumer>
    );
  }
}
