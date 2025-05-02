import React from 'react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: number;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <div>
      <button className="bg-slate-500" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
