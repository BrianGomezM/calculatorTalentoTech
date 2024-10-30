// Boton.js
import React from 'react';

const Boton = ({ texto, onClick, tipo = 'secundario' }) => {
  const botonClase = tipo === 'primario' ? 'btn btn-primary w-100' : 'btn btn-secondary w-100';

  return (
    <button className={botonClase} onClick={onClick}>
      {texto}
    </button>
  );
};

export default Boton;
