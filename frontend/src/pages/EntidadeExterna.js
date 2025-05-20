import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/LayoutPaginasTabelas.module.css';
import Navbar2 from "../components/Navbar2.js";
import Tabela from '../components/Tabela.jsx';
import Button from '../components/Button.js';

const EntidadesExternas = () => {
  const [entidades, setEntidades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novaEntidade, setNovaEntidade] = useState({
    Especialidade: '',
    Contacto: '',
    Email: '',
    Nome: '',
    Nif: ''
  });

  useEffect(() => {
    const fetchEntidades = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/entidades/ver', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        setEntidades(data);
      } catch (error) {
        console.error('Erro ao buscar entidades externas:', error);
      }
    };

    fetchEntidades();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaEntidade({ ...novaEntidade, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/entidades/registar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(novaEntidade)
      });
      if (!res.ok) throw new Error('Erro ao registar entidade.');
      
      const data = await res.json();
      toast.success('Entidade registada com sucesso!');
      setShowModal(false);
      setNovaEntidade({
        Especialidade: '',
        Contacto: '',
        Email: '',
        Nome: '',
        Nif: ''
      });
      setEntidades([...entidades, data]);
    } catch (error) {
      console.error('Erro ao registar entidade:', error);
      toast.error('Erro ao registar entidade.');
    }
  };

  const colunas = [
    'ID',
    'Nome',
    'Nif',
    'Contacto',
    'Email',
    'Especialidade'
  ];

  return (
    <div className="page-content">
      <Navbar2 />
      <div className="home-container">
        <div className={styles.fundo}>
          <p className={styles.pmeusRecursos}>Entidades Externas</p>
          <Button onClick={() => setShowModal(true)} className={styles.btnregistarRecurso}>Adicionar Entidade</Button>


          <Tabela
            colunas={colunas}
            dados={entidades}
            aoClicarAcao={() => {}}
            tipoAcao="link"
            mensagemVazio="Nenhuma entidade externa encontrada."
          />
        </div>

        {showModal && (
          <>
            <div
              className={styles.modalbackdrop}
              onClick={() => setShowModal(false)}
            />
            <div className={styles.modalcontent}>
              <h3 className={styles.titulo}>Adicionar Nova Entidade</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Nome:
                  <input
                    type="text"
                    name="Nome"
                    value={novaEntidade.Nome}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Especialidade:
                  <input
                    type="text"
                    name="Especialidade"
                    value={novaEntidade.Especialidade}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Contato:
                  <input
                    type="text"
                    name="Contacto"
                    value={novaEntidade.Contacto}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="Email"
                    value={novaEntidade.Email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  NIF:
                  <input
                    type="text"
                    name="Nif"
                    value={novaEntidade.Nif}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <div>
                  <Button type="submit">Registrar</Button>
                  <Button onClick={() => setShowModal(false)} type="button">Fechar</Button>
                </div>
              </form>
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default EntidadesExternas;
