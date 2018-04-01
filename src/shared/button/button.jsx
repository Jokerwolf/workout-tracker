//@flow
import * as React from 'react';

import './button.css';

type Props = {
  clickHandler: (any) => any,
  children: React.Node
};

const Button = (props: Props) => {
  const { clickHandler } = props;

  return <button className="button" onClick={() => clickHandler()}>{props.children}</button>
};

export { Button };
