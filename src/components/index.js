import React, { PropTypes } from 'react';

export function Paragraph({ children }) {
  return (
    <p>{children}</p>
  );
}
Paragraph.propTypes = { children: PropTypes.string.isRequired };
