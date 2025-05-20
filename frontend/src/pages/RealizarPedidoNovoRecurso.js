import React, { useState } from 'react';
import "../styles/RealizarPedidoNovoRecurso.css";
import Navbar2 from "../components/Navbar2.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button.js';

const RealizarPedidoNovoRecurso = () => {
  const [desc_pedido_novo_recurso, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/api/recursoscomuns/pedidosnovos/inserir?desc_pedido_novo_recurso=${desc_pedido_novo_recurso}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // importante se usares cookies httpOnly
        body: JSON.stringify({ desc_pedido_novo_recurso }),
      });
      toast.success('Pedido de novo recurso realizado com sucesso!');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao realizar pedido de novo recurso:', error);
      toast.error('Erro ao realizar pedido de novo recurso.');
    }
  };

  return (
    <div className="page-content">
      <Navbar2 />
      <div className="home-container">
        <div className='fundoNovosRecursos'>
          <div className='textoEsquerda'>
            <p className='p-NovosRecursos'>Realizar Pedido de Novo Recurso</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Descrição:</label><br></br>
                <textarea className='inputNovoRecurso' value={desc_pedido_novo_recurso} onChange={(e) => setDescricao(e.target.value)} required/>
              </div>
              <Button className="btnNovoRecurso" type="submit">Realizar pedido</Button>
            </form>
          </div>

          <div className='imagemDireita'>
            <img className='imgNovosRecursos' src="./img/fundo2.png" alt="Imagem"/>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RealizarPedidoNovoRecurso;
