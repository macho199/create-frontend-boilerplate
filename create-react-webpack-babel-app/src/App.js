import React, { useState } from "react";

const App = () => {
  const [state, setState] = useState(0);

  const btnOnClickEventHandler = () => {
    setState((prev) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <button onClick={btnOnClickEventHandler}>{state}</button>
    </div>
  );
};

export default App;
