import React from 'react';

export function HeaderBar({children}) {
  return (<div> {children} </div>);
}
export function Page({children}) {
  return (<div> {children} </div>);
}

export function Logo({def}) {
  return (<h1> {def} </h1>);
}

export function Navbar({links}) {
  return (<ul> {links && links.map((link, key) => (<li key={key}><a>{link}</a></li>))} </ul>);
}

export function SearchForm({children}) {
  return (<div> <input type="text"/><button type="submit">Search</button></div>);
}

export function CartCounter({children}) {
  return (<div> cart 0 </div>);
}
