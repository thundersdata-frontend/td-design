import { Component } from 'react';
import { PortalMethods } from './portalHost';

export default class PortalConsumer extends Component<{ methods: PortalMethods }> {
  _key = 0;

  componentDidMount() {
    if (!this.props.methods) {
      throw new Error('请用ThemeProvider包裹您的应用');
    }

    this._key = this.props.methods.mount({ children: this.props.children });
  }

  componentDidUpdate() {
    this.props.methods.update({ key: this._key, children: this.props.children });
  }

  componentWillUnmount() {
    this.props.methods.unmount(this._key);
  }

  render() {
    return null;
  }
}
