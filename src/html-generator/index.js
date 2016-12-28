import { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';

import * as components from 'components';

export function convertJsToReactComponent(name, props = {}) {
  const component = components[name] || name;
  const nextProps = {};
  const childs = [];
  if (typeof props === 'object') {
    Object.keys(props).forEach((key) => {
      if (key.substring(0, 1) === key.substring(0, 1).toUpperCase()) {
        childs.push(convertJsToReactComponent(key, props[key]));
      } else {
        nextProps[key] = props[key];
      }
    });
  } else if (typeof props === 'string') {
    childs.push(props);
  }

  const args = [component, nextProps, ...childs];
  return createElement(...args);
}

export default function generator(tree) {
  const element = convertJsToReactComponent('div', tree);
  return ReactDOMServer.renderToStaticMarkup(element);
}
