import React from 'react';

const Button = ({ onClick, children, className = '', type = 'button'  }) => {
  return (
    <button onClick={onClick} className={`meu-botao-base ${className}`} type={type}>
      {children}
    </button>
  );
};
export default Button;

