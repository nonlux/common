import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './style.css';

export default class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const {children, className} = this.props;
    const nextClassName = classnames(className);

    return (
      <div>
        {children}
      </div>
    );
  }
}
