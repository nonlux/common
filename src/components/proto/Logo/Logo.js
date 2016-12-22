import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './style.css';
import icon from './icon.svg';

export default class Logo extends Component {
  static propTypes = {
    def: PropTypes.string,
    className: PropTypes.string,
  }

  getClassName() {
    return classnames(
      this.props.className,
      'proto-logo',
    );
  }

  render() {
    const { def } = this.props;
    const nextClassName = this.getClassName();

    return (
      <h1 className={nextClassName}>
        <img className="image" src={icon} />
        {def}
      </h1>);
  }
}

