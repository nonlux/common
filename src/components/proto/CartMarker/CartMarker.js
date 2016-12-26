import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './style.css';

import {
  FaIcon
} from 'components';

export default class CartMarker extends Component {
  static propTypes = {
    className: PropTypes.string,
    def: PropTypes.string,
  }

  getClassName() {
    return classnames(
      this.props.className,
      'proto-cart-marker',
    );
  }

  render() {
    const { def } = this.props;
    const nextClassName = this.getClassName();

    return (
      <div className={nextClassName}>
        <FaIcon name="shopping-cart" /> {def}
      </div>
    );
  }
}
