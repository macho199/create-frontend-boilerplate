import React, { useState } from "react";
import tw, { TwStyle } from 'twin.macro'

const styles: TwStyle[] = [tw`p-5 bg-red-500`, tw`bg-red-300`]

const App = () => {
  const [state, setState] = useState<number>(0);

  const btnOnClickEventHandler = () => {
    setState((prev) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <button css={[tw`bg-slate-500`, ...styles]} onClick={btnOnClickEventHandler}>{state}</button>
    </div>
  );
};

export default App;
