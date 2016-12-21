import React, { Component, PropTypes } from 'react';

import {
  FaIcon,
} from 'components';

export default class Logo extends Component {
  static propTypes = {
    def: PropTypes.string,
  }
  render() {
    const { def } = this.props;

    return (<h1> <FaIcon name="coffee"/> {def} </h1>);
  }
}

