import React, { useState } from 'react';
import Button from './Button';

export default function App() {
  const [state, setState] = useState<number>(0);

  const btnOnClickEventHandler = () => {
    setState((prev) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <Button onClick={btnOnClickEventHandler}>{state}</Button>
    </div>
  );
}
