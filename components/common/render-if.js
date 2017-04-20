import React, { PropTypes } from 'react';

const RenderIf = ({ expr, children }) => {
  return expr ? React.Children.only(children) : null;
};

RenderIf.propTypes = {
  expr: PropTypes.bool.isRequired
};

export default RenderIf;
