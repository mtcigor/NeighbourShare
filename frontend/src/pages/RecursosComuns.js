import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/MeusRecursos.css";
import Navbar2 from "../components/Navbar2.js";
import Tabela from "../components/Tabela.jsx";
import Button from '../components/Button.js';

const MeusRecursos = () => {
  const [recurso, setUsers] = useState([]);
  const [erro, setErro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newResource, setNewResource] = useState({
    nome_recurso: '', 
    descricao_recurso: '', 
    imagem: null,
  });


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/recursoscomuns', {
          
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Erro ao buscar dados');
        const data = await res.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        setErro(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleAddResource = async () => {

    const formData = new FormData();
    formData.append('nome_recurso', newResource.nome_recurso);
    formData.append('descricao_recurso', newResource.descricao_recurso);
    formData.append('imagem', newResource.imagem);
    

    // Enviar os dados para a API
    try {
      const res = await fetch('http://localhost:8000/api/recursoscomuns/inserir', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Erro ao adicionar recurso');

      toast.success('Recurso adicionado com sucesso!');
      setShowModal(false);

      setNewResource({ 
        nome_recurso: '', 
        descricao_recurso: '', 
        imagem: null,
      }); // Limpar campos após envio
    } catch (error) {
      toast.error('Erro ao adicionar recurso: ' + error.message);
    }
  };

  const handleFileChange = (e) => {
    setNewResource({ ...newResource, imagem: e.target.files[0] });
  };


  return (
    <div className="page-content">
      <Navbar2 />
      <div className="home-container">
        <div className='fundoMeusRecursos'>
          
          {/* Botão para abrir o modal de adicionar recurso */}
          <Button onClick={() => setShowModal(true)} className="btn-registarRecurso">Adicionar Recurso Comum</Button>

  
          {/* Modal de Adicionar Recurso */}
          {showModal && (
            <>
              <div className="modal-backdrop" onClick={() => setShowModal(false)} />
              <div className="modal-content">
                <h2>Adicionar Recurso Comum</h2>
                <input
                  type="text"
                  placeholder="Nome do Recurso"
                  value={newResource.nome_recurso}
                  onChange={(e) => setNewResource({ ...newResource, nome_recurso: e.target.value })}
                />
                <textarea
                  placeholder="Descrição"
                  value={newResource.descricao_recurso}
                  onChange={(e) => setNewResource({ ...newResource, descricao_recurso: e.target.value })}
                />
                <input type="file" onChange={handleFileChange} />
                <div>
                  <Button onClick={handleAddResource}>Adicionar</Button>
                  <Button onClick={() => setShowModal(false)}>Cancelar</Button>
                </div>
              </div>
            </>
          )}
  
          <p className='p-meusRecursos'>Recursos Comuns</p>
          <Tabela
            colunas={['Nº Recurso', 'Nome do Recurso', 'Descrição']}
            dados={recurso.map((recurso) => ({
              'Nº Recurso': recurso.RecComumID,
              'Nome do Recurso': recurso.Nome,
              'Descrição': recurso.DescRecursoComum,
            }))}
            mensagemVazio="Nenhum recurso comum encontrado."
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
  
};

export default MeusRecursos;
