import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Orcamentos.css";
import Navbar2 from "../components/Navbar2.js";
import Tabela from "../components/Tabela.jsx";

const Orcamentos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [newResource, setNewResource] = useState({
    id_entidade_externa: '', 
    valor_orcamento: '', 
    descricao_orcamento: '',
    pdforcamento: null,
    idprocesso: '',
    tipoorcamento: ''
  });
  const [votacao, setVotacao] = useState({
    titulo: '',
    descricao: '',
    id_processo: 0,
    data_fim: '',
    tipo_votacao: 'Aquisição',
  });
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!newResource.tipoorcamento) return; // se não escolheu nada, não faz nada
  
      let url = '';
      if (newResource.tipoorcamento === 'Aquisição') {
        url = 'http://localhost:8000/api/recursoscomuns/pedidosnovos';
      } else if (newResource.tipoorcamento === 'Manutenção') {
        url = 'http://localhost:8000/api/recursoscomuns/pedidosmanutencao';
      } else {
        return;
      }
  
      try {
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!res.ok) throw new Error('Erro ao buscar pedidos');
        const data = await res.json();
        console.log(data)
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };
  
    fetchPedidos();
  }, [newResource.tipoorcamento]);
  

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/orcamentos/listar', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Erro ao buscar dados');
        const data = await res.json();
        console.log(data);
        setOrcamentos(data);
      } catch (error) {
        console.error('Erro ao buscar orcamentos:', error);
      }
    };

    const fetchFornecedores = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/entidades/ver', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Erro ao buscar fornecedores');
        const data = await res.json();
        console.log(data);
        setFornecedores(data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchOrcamentos();
    fetchFornecedores();
  }, []);

  const handleAddResource = async () => {
    try {
      const formData = new FormData();
      formData.append('id_entidade_externa', newResource.id_entidade_externa);
      formData.append('valor_orcamento', parseInt(newResource.valor_orcamento));
      formData.append('descricao_orcamento', newResource.descricao_orcamento);
      formData.append('pdforcamento', newResource.pdforcamento);
      formData.append('idprocesso', newResource.idprocesso);
      formData.append('tipoorcamento', newResource.tipoorcamento);

      const res = await fetch('http://localhost:8000/api/orcamentos/inserir', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        throw new Error(errorData.detail || 'Erro ao adicionar recurso');
      }

      toast.success('Recurso adicionado com sucesso!');
      setShowModal(false);

      setNewResource({ 
        id_entidade_externa: '', 
        valor_orcamento: '', 
        descricao_orcamento: '', 
        pdforcamento: null,
        idprocesso: '',
        tipoorcamento: ''
      });
    } catch (error) {
      toast.error('Erro ao adicionar recurso: ' + error.message);
    }
  };

  const handleCreateVotacao = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/criarvotacao', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(votacao),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        throw new Error(errorData.detail || 'Erro ao criar votação');
      }

      toast.success('Votação criada com sucesso!');
      setShowModal(false);
      setVotacao({
        titulo: '',
        descricao: '',
        id_processo: 0,
        data_fim: '',
        tipo_votacao: '',
      });
    } catch (error) {
      toast.error('Erro ao criar votação: ' + error.message);
    }
  };

  const handleFileChange = (e) => {
    setNewResource({ ...newResource, pdforcamento: e.target.files[0] });
  };

  return (
    <div className="page-content">
      <Navbar2 />
  
      <div className="home-container">
        <div className='fundoMeusRecursos'>
          <button className="btn-registarRecurso" onClick={() => { setShowModal(true); setModalType('orcamento'); }}>Inserir Orçamento</button>
          <button className="btn-criarVotacao" onClick={() => { setShowModal(true); setModalType('votacao'); }}>Criar Votação</button>
  
          {showModal && (
            <>
              <div className="modal-backdrop" onClick={() => setShowModal(false)} />
              <div className="modal-content">
                {modalType === 'orcamento' ? (
                  <>
                    <h2>Adicionar Orçamento</h2>
                    <select
                      value={newResource.id_entidade_externa}
                      onChange={(e) => setNewResource({ ...newResource, id_entidade_externa: e.target.value })}
                    >
                      <option value="">Selecione um fornecedor</option>
                      {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.EntidadeID} value={fornecedor.EntidadeID}>
                          {fornecedor.Nome}
                        </option>
                      ))}
                    </select>
                    <input type="number" placeholder="valor" value={newResource.valor_orcamento} onChange={(e) => setNewResource({ ...newResource, valor_orcamento: e.target.value })} />
                    <input type="text" placeholder="descricao" value={newResource.descricao_orcamento} onChange={(e) => setNewResource({ ...newResource, descricao_orcamento: e.target.value })} />
                    <select className='input-style' value={newResource.idprocesso} onChange={(e) => setNewResource({ ...newResource, idprocesso: e.target.value })} style={{ margin: '10px 0' }}>
                        <option value="">Selecione um pedido</option>
                        {pedidos.map((pedido) => (
                          <option key={pedido.PedidoNovoRecID || pedido.PMID} value={pedido.PedidoNovoRecID || pedido.PMID}>
                            {pedido.DescPedidoNovoRecurso || pedido.DescPedido}
                          </option>
                        ))}
                      </select>
                    <select className='input-style' value={newResource.tipoorcamento}  onChange={(e) => setNewResource({ ...newResource, tipoorcamento: e.target.value })}>
                          <option value="">Selecione o tipo de orçamento</option>
                          <option value="Aquisição">Aquisição</option>
                          <option value="Manutenção">Manutenção</option>
                    </select>
                    <input type="file" onChange={handleFileChange} />
                    <div>
                      <button onClick={handleAddResource}>Adicionar</button>
                      <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Criar Votação</h2>
                    <input
                      type="text"
                      placeholder="Título"
                      value={votacao.titulo}
                      onChange={(e) => setVotacao({ ...votacao, titulo: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Descrição"
                      value={votacao.descricao}
                      onChange={(e) => setVotacao({ ...votacao, descricao: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="ID do Processo"
                      value={votacao.id_processo}
                      onChange={(e) => setVotacao({ ...votacao, id_processo: parseInt(e.target.value) })}
                    />
                    <input
                      type="date"
                      placeholder="Data de Fim"
                      value={votacao.data_fim}
                      onChange={(e) => setVotacao({ ...votacao, data_fim: e.target.value })}
                    />
                    <select className='input-style'
                      value={votacao.tipo_votacao}
                      onChange={(e) => setVotacao({ ...votacao, tipo_votacao: e.target.value })}
                    >
                      <option value="">Selecione o tipo</option>
                          <option value="Aquisição">Aquisição</option>
                          <option value="Manutenção">Manutenção</option>
                    </select>
                    <div>
                      <button onClick={handleCreateVotacao}>Criar</button>
                      <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
  
          <p className='p-meusRecursos'>Orçamentos</p>
          <Tabela
            colunas={['Nº Orçamento', 'Fornecedor', 'Valor', 'Descrição']}
            dados={orcamentos.map((orcamento) => ({
              'Nº Orçamento': orcamento.OrcamentoID,
              'Fornecedor': orcamento.Entidade,
              'Valor': orcamento.Valor,
              'Descrição': orcamento.DescOrcamento,
            }))}
            mensagemVazio="Nenhum orçamento encontrado."
          />
        </div>
      </div>
  
      <ToastContainer />
    </div>
  );
  
};

export default Orcamentos;
