//@flow
import React from 'react';

import './button.css';

type Props = {
  clickHandler: (any) => any
};

const Button = (props: Props) => {
  const { clickHandler } = props;

  return <button className="button" onClick={() => clickHandler()}>{props.children}</button>
};

export { Button };
