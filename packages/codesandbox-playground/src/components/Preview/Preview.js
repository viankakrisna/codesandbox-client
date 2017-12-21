import React from 'react';

import { filePropTypes } from '../../utils/prop-types';

export default class Preview extends React.PureComponent {
  static propTypes = {
    ...filePropTypes,
  };

  static defaultProps = {
    dependencies: {},
    resources: [],
  };

  setupFrame = el => {
    if (el) {
      this.frame = el;
      this.frame.onload = () => {
        this.sendCode();
      };
    }
  };

  sendCode = () => {
    const modules = Object.keys(this.props.files).map(path => ({
      ...this.props.files[path],
      path,
    }));

    this.frame.contentWindow.postMessage(
      {
        type: 'compile',
        codesandbox: true,
        version: 2,
        modules,
        entry: '/index.js',
        externalResources: this.props.resources,
        dependencies: this.props.dependencies,
      },
      '*'
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.files !== prevProps.files) {
      this.sendCode();
    }
  }

  render() {
    return (
      <iframe
        style={{ width: '100%', height: '1000px', border: 'none' }}
        src="https://sandbox.codesandbox.io"
        ref={this.setupFrame}
      />
    );
  }
}
