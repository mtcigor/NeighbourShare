import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button.js';
import "../styles/Registar.css";

const Registar = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/registar', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        throw new Error(errorData.detail || 'Erro ao registrar utilizador');
      }

      toast.success('Utilizador registrado com sucesso!');
      setEmail('');
      setRole('');
    } catch (error) {
      toast.error('Erro ao registrar utilizador: ' + error.message);
    }
  };

  return (
    <div className="container-registar">
      <div className="container-esquerda">
        <h1>Registar Utilizador</h1>
        <div className="container-formulario">
            <h2>Registar Novo Utilizador</h2><br></br>
            <div className="container-form">
              <input className="inputRegisto"  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            
              <select className="inputRegisto" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Selecione um cargo</option>
                <option value="residente">Residente</option>
                <option value="gestor">Gestor</option>
                <option value="admin">Admin</option>
              </select>

              
              <div className="container-btn">
                <Button onClick={handleRegister} className="btn">Registar</Button>
              </div>
            </div>
        </div>
      </div>
      <div className="container-direita">
        <img className="imagem" src="img/fundo.jpg" alt="Imagem" />
      </div>
      <ToastContainer />
    </div>

        
  );
};

export default Registar;
