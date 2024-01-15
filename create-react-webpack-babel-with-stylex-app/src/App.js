import React, { useState } from "react";
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  base: {
    background: 'red',
    padding: '20px'
  }
})

const App = () => {
  const [state, setState] = useState(0);

  const btnOnClickEventHandler = () => {
    setState((prev) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <button onClick={btnOnClickEventHandler} {...stylex.props(styles.base)}>{state}</button>
    </div>
  );
};

export default App;
