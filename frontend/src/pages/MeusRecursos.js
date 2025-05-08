import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/MeusRecursos.css";
import Navbar2 from "../components/Navbar2.js";

const MeusRecursos = () => {
  const [recurso, setUsers] = useState([]);
  const [erro, setErro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newResource, setNewResource] = useState({
    nome_recurso: '', 
    descricao_recurso: '', 
    caucao_recurso: '',
    recurso_disponivel: '', 
    categoria_recurso: '', 
    fotos_recurso: null,
  });


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/recursos/pessoais', {
          
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
    formData.append('caucao_recurso', newResource.caucao_recurso);
    formData.append('recurso_disponivel', newResource.recurso_disponivel);
    formData.append('categoria_recurso', newResource.categoria_recurso);  
    formData.append('fotos_recurso', newResource.fotos_recurso);
    //formData.append('utilizador_recurso', 2); // Adicione o ID do utilizador aqui
    

    // Enviar os dados para a API
    try {
      const res = await fetch('http://localhost:8000/api/recursos/inserir', {
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
        caucao_recurso: '', 
        recurso_disponivel: '',
        categoria_recurso: '', 
        fotos_recurso: null,
      }); // Limpar campos após envio
    } catch (error) {
      toast.error('Erro ao adicionar recurso: ' + error.message);
    }
  };

  const handleFileChange = (e) => {
    setNewResource({ ...newResource, fotos_recurso: e.target.files[0] });
  };


  return (
    <div className="page-content">
<Navbar2 />
    <div className="home-container">
      
      <div className='fundoMeusRecursos'>


      {/* Botão para abrir o modal de adicionar recurso */}
      <button className="btn-registarRecurso" onClick={() => setShowModal(true)}>Adicionar Recurso</button>

      {/* Modal de Adicionar Recurso */}
      {showModal && (

        <>
          <div className="modal-backdrop" onClick={() => setShowModal(false)} />
            <div className="modal-content">
              <h2>Adicionar Recurso</h2>
              <input type="text" placeholder="Nome do Recurso" value={newResource.nome_recurso} onChange={(e) => setNewResource({ ...newResource, nome_recurso: e.target.value })}/>
              <textarea placeholder="Descrição" value={newResource.descricao_recurso} onChange={(e) => setNewResource({ ...newResource, descricao_recurso: e.target.value })}/>
              <input type="text" placeholder="Caução" value={newResource.caucao_recurso} onChange={(e) => setNewResource({ ...newResource, caucao_recurso: e.target.value })}/>
              <select className='input-style' value={newResource.recurso_disponivel} onChange={(e) => setNewResource({ ...newResource, recurso_disponivel: e.target.value })}>
                <option value="">Disponível?</option>
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
              </select>
              <select className='input-style' value={newResource.categoria_recurso} onChange={(e) => setNewResource({ ...newResource, categoria_recurso: e.target.value })}>
                <option value="">Selecione a Categoria</option>
                <option value="Lazer">Lazer</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Ferramentas">Ferramentas</option>
                <option value="Cozinha">Cozinha</option>
                <option value="Outros">Outros</option>
              </select>
              <input type="file" onChange={handleFileChange} />
              <div>
                <button onClick={handleAddResource}>Adicionar</button>
                <button onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
          </div>
        </>

      )}


      <p className='p-meusRecursos'>Os Meus Recursos</p>
      <table >
        <thead>
          <tr>
            <th>Nº Recurso</th>
            <th>Nome do Recurso</th>
            <th>Caução</th>
            <th>Categoria</th>
            <th>Disponibilidade</th>
          </tr>
        </thead>
        <tbody>
          {recurso.map((recurso) => (
            <tr key={recurso.RecursoID}>
              <td>{recurso.RecursoID}</td>
              <td>{recurso.Nome}</td>
              <td>{recurso.Caucao}</td>
              <td>{recurso.Categoria_.DescCategoria}</td>
              <td>{recurso.Disponibilidade_.DescDisponibilidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    <ToastContainer />
</div>
  );
};

export default MeusRecursos;
