import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './style.css';

export default class Navbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    links: PropTypes.array.isRequired,
  }

  getClassName() {
    return classnames(
      this.props.className,
      'proto-navbar',
    );
  }

  render() {
    const { links } = this.props;
    const nextClassName = this.getClassName();

    return (
      <ul className={nextClassName}>
        {links && links.map((link, key) => (
          <li className="item" key={key}>
            <a>{link}</a>
          </li>
        ))}
      </ul>
    );
  }
}
