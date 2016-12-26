import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './style.css';

import {
  FaIcon
} from 'components';

export default class SearchForm extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  getClassName() {
    return classnames(
      this.props.className,
      'proto-search-form',
    );
  }

  render() {
    const nextClassName = this.getClassName();

    return (
      <form className={nextClassName}>
        <input type="text" />
        <button type="submit"> <FaIcon name="search" className="fa-fw"/>&nbsp;</button>
      </form>
    );
  }
}

