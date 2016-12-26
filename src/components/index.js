import React from 'react';
import classnames from 'classnames';


export * as proto from './proto';

export function FaIcon({name, className=''}) {
  const nextClassName = classnames(className, 'fa', `fa-${name}`);
  return (<span className={nextClassName} />);
}
