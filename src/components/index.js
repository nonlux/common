import React from 'react';
import classnames from 'classnames';

export function HeaderBar({children}) {
  return (<div> {children} </div>);
}

export function SearchForm({children}) {
  return (<div> <input type="text"/><button type="submit">Search</button></div>);
}

export function CartCounter({children}) {
  return (<div> cart 0 </div>);
}


export * as proto from './proto';

export function FaIcon({name, className=''}) {
  const nextClassName = classnames(className, 'fa', `fa-${name}`);
  return (<span className={nextClassName} />);
}
