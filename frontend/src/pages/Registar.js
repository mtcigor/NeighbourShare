import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button.js';

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
    <div className="page-content">
      <div className="register-container">
        <h2>Registar Utilizador</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button onClick={handleRegister}>Registar</Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registar;
