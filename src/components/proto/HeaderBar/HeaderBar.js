import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './style.css';

import {
  FaIcon
} from 'components';

export default class HeaderBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  getClassName() {
    return classnames(
      this.props.className,
      'proto-headerbar',
    );
  }

  render() {
    const { children } = this.props;
    const nextClassName = this.getClassName();

    return (
      <div className={nextClassName}>
        {children}
      </div>
    );
  }
}










