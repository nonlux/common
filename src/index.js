import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import * as components from 'components';

const page = {
  HeaderBar: {
    Logo: 'Jupiter proto',
    Navbar: {
      links: [
        'Home',
        'Templates',
        'Pages',
        'Elements',
        'Works',
        'Blog',
        'Shop',
      ],
    },
    SearchForm: true,
    CartCounter: true,
  },
};

function generateObject(name, object) {
  const childs = [];
  const props = {};
  if (object instanceof Object) {
    Object.keys(object).forEach((key) => {
      if (key[0] === key[0].toUpperCase()) {
        childs.push(generateObject(key, object[key]));
      } else {
        props[key] = object[key];
      }
    });
  } else if (typeof object === 'string') {
    props.def = object;
  }
  if (!components[name]) {
    throw new Error(`no exist component ${name}`);
  }

  const args = [components[name], props, ...childs];
  return React.createElement(...args);
}

function GeneratedPage({ page }) {
  return generateObject('Page', page);
};

ReactDOM.render(<GeneratedPage page={page} />, document.getElementById('content'));

