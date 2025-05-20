import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button.js';
import '../styles/AtualizarDados.css'; // importa o CSS personalizado

const AtualizarDados = () => {
  const [data_nascimento, setDataNascimento] = useState('');
  const [nome, setNome] = useState('');
  const [contacto, setContacto] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [foto, setFoto] = useState(null);

  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const search = location.search;
    if (search.startsWith('?')) {
      const tokenFromUrl = search.substring(1);
      setToken(tokenFromUrl);
    }
  }, [location]);

  const handleUpdate = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])([^\s]){8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error('Password inválida. Deve ter pelo menos 8 caracteres, incluindo uma maiúscula, uma minúscula, um número e um carácter especial.');
      return;
    }

    const formData = new FormData();
    formData.append('data_nascimento', data_nascimento);
    formData.append('nome', nome);
    formData.append('contacto', contacto);
    formData.append('password', password);
    formData.append('token', token);
    if (foto) formData.append('foto', foto);

    try {
      const res = await fetch('http://localhost:8000/api/registar/atualizar_dados', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Erro ao atualizar dados');
      }

      toast.success('Dados atualizados com sucesso!');
      setDataNascimento('');
      setNome('');
      setContacto('');
      setPassword('');
      setFoto(null);

      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      toast.error('Erro ao atualizar dados: ' + error.message);
    }
  };

  return (
    <div className="page-content">
      <div className="update-container">
        <h1>Atualizar Dados</h1>
        <input
          type="date"
          value={data_nascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className="update-input"
        />
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="update-input"
        />
        <input
          type="number"
          placeholder="Contacto"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          className="update-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="update-input"
        />
        <input
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
          className="update-input"
        />
        <div className="btn-update-wrapper">
          <Button onClick={handleUpdate} className='btn'>Atualizar</Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AtualizarDados;
