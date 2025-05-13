import React from 'react';

/**
 * Button Component
 * 
 * Um botão reutilizável que permite escolher variantes de estilo e adicionar outras propriedades facilmente.
 *
 * Props:
 * - children: Conteúdo dentro do botão (texto, ícones, etc.).
 * - onClick: Função chamada ao clicar no botão.
 * - type: Tipo de botão ("button", "submit", "reset"). Valor padrão: "button".
 * - className: Classes CSS adicionais.
 * - variant: Variante visual do botão ("default", "green", "red"). Valor padrão: "default".
 * - ...props: Outros atributos HTML válidos (id, disabled, title, etc.).
 */
const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  className = "", 
  variant = "default", 
  ...props 
}) => {

  // Mapeamento entre as variantes e as classes CSS correspondentes
  const variantClasses = {
    default: '',
    green: 'button-green',
    red: 'button-red',
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`button ${variantClasses[variant] || ''} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;