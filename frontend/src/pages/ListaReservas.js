import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/LayoutPaginasTabelas.module.css";
import Navbar2 from "../components/Navbar2.js";
import Tabela from '../components/Tabela.jsx';
import Button from '../components/Button.js';

const MeusPedidosReserva = () => {
  const [disabledButtons, setDisabledButtons] = useState(new Set());
  const [comoSolicitante, setComoSolicitante] = useState([]); // data[1]
  const [comoDono, setComoDono] = useState([]);               // data[0]
  const [showModal, setShowModal] = useState(false);
  const [newResource, setNewResource] = useState({
      justification: '', 
  });
 const [selectedReservaID, setSelectedReservaID] = useState(null);


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/reserva/lista', {
          method: 'GET',
          credentials: 'include' 
        });
        const data = await res.json();
        console.log(data);
        setComoDono(data[0] || []);         // Dono → Segunda tabela
        setComoSolicitante(data[1] || []);  // Solicitante → Primeira tabela
      } catch (error) {
        console.error('Erro ao buscar pedidos de reserva:', error);
      }
    };

    fetchReservations();
  }, []);


  const handleUpdate = async (id, field, value, origem) => {
    const fieldMap = {
      recursoEntregue: 'RecursoEntregueSolicitante',
      caucaoEntregue: 'ConfirmarCaucaoSolicitante',
      recursoEntregue2: 'RecursoEntregueDono',
      caucaoEntregue2: 'ConfirmarCaucaoDono',
      bomEstado: 'bomEstado'
    };
    const fieldName = fieldMap[field];
  
    // Mostrar confirmação se for uma ação irreversível
    if (['recursoEntregue', 'caucaoEntregue', 'recursoEntregue2', 'caucaoEntregue2'].includes(field)) {
      const confirmar = window.confirm("Esta operação é irreversível. Tens a certeza que queres continuar?");
      if (!confirmar) return;
    }
  
    let apiEndpoint = '';
  
    switch (field) {
      case 'recursoEntregue':
        apiEndpoint = `http://localhost:8000/api/reserva/confirma/rececao/recurso?reserva_id=${id}`;
        break;
      case 'caucaoEntregue':
        apiEndpoint = `http://localhost:8000/api/reserva/confirma/entrega/caucao?reserva_id=${id}`;
        break;
      case 'recursoEntregue2':
        apiEndpoint = `http://localhost:8000/api/reserva/confirma/entrega/recurso?reserva_id=${id}`;
        break;
      case 'caucaoEntregue2':
        apiEndpoint = `http://localhost:8000/api/reserva/confirma/rececao/caucao?reserva_id=${id}`;
        break;
      case 'bomEstado':
        apiEndpoint = `http://localhost:8000/api/reserva/confirma/bomestado?reserva_id=${id}`;
        break;
      default:
        console.error('Campo desconhecido:', field);
        return;
    }
  
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reserva_id: id, value }),
      });
  
      const result = await response.json();
      console.log('API response:', result);
  
      if (response.ok) {
        const updateState = (prev) =>
          prev.map((reservation) =>
            reservation.ReservaID === id
              ? { ...reservation, [fieldName]: value }
              : reservation
          );
  
        if (origem === 'solicitante') {
          setComoSolicitante(updateState);
        } else if (origem === 'dono') {
          setComoDono(updateState);
        }
  
        // Adiciona o botão desativado
        setDisabledButtons(prev => new Set(prev).add(`${field}-${id}`));
      } else {
        console.error('Erro na resposta da API:', result);
      }
    } catch (error) {
      console.error('Erro ao atualizar pedido de reserva:', error);
    }
  };
  
      
   
const handleJustification = (id) => {
   const justification = newResource.justification;

   if (justification.trim() === '') {
    toast.error('A justificação não pode estar vazia.');
    return;
   }


   fetch(`http://localhost:8000/api/reserva/submissao/justificacao?reserva_id=${id}&justificacao=${justification}`, {
   method: 'POST',
   credentials: 'include',
   headers: {
   'Content-Type': 'application/json',
   },
   body: JSON.stringify({ reserva_id: id, justification }),
   })
   .then(response => response.json())
   .then(data => {
   console.log('Justificação enviada:', data);
   toast.success('Justificação enviada com sucesso!');
   setShowModal(false);
   setNewResource({ justification: '' }); // limpar campo
   })
   .catch(error => {
   console.error('Erro ao enviar justificação:', error);
   toast.error('Erro ao enviar justificação.');
   });
 
   };
   
   
  const filteredComoDono = (comoDono || []).filter(reservation => 
   !reservation.DevolucaoCaucao === true && !reservation.EstadoRecurso === true && reservation.JustificacaoEstadoProduto === null
  );

  const filteredComoSolicitante = (comoSolicitante || []).filter(reservation =>
    !reservation.DevolucaoCaucao === true && !reservation.EstadoRecurso === true && reservation.JustificacaoEstadoProduto === null
  );
  

  return (
    <div className="page-content">
      <Navbar2 />
      <div className="home-container">
        <div className={styles.fundo}>
          <p className={styles.titulo}>Os Meus Pedidos de Reserva de Recursos</p>
          <Tabela
            colunas={[
              'ReservaID',
              'Dono',
              'DataInicio',
              'DataFim',
              'NomeRecurso',
              'Recurso Recebido',
              'Caução Entregue'
            ]}
            dados={comoSolicitante.map((res) => ({
              ...res,
              'Recurso Recebido': (
                <button
                  className="btnConfirmacoes"
                  onClick={() => handleUpdate(res.ReservaID, 'recursoEntregue', !res.RecursoEntregueSolicitante, 'solicitante')}
                  disabled={disabledButtons.has(`recursoEntregue-${res.ReservaID}`)}
                >
                  {res.RecursoEntregueSolicitante ? 'Sim' : 'Não'}
                </button>
              ),
              'Caução Entregue': (
                <button
                  className="btnConfirmacoes"
                  onClick={() => handleUpdate(res.ReservaID, 'caucaoEntregue', !res.ConfirmarCaucaoSolicitante, 'solicitante')}
                  disabled={disabledButtons.has(`caucaoEntregue-${res.ReservaID}`)}
                >
                  {res.ConfirmarCaucaoSolicitante ? 'Sim' : 'Não'}
                </button>
              )
            }))}
            mensagemVazio="Nenhum pedido de reserva encontrado."
          />
        </div>
  
        <div className={styles.fundo}>
          <p className={styles.titulo}>Reservas</p>
          <Tabela
            colunas={[
              'ReservaID',
              'Solicitante',
              'DataInicio',
              'DataFim',
              'NomeRecurso',
              'Recurso Entregue',
              'Caucao Recebida',
              'Confirmar Estado Recurso'
            ]}
            dados={comoDono.map((res) => ({
              ...res,
              'Recurso Entregue': (
                <button
                  className="btnConfirmacoes"
                  onClick={() => handleUpdate(res.ReservaID, 'recursoEntregue2', !res.RecursoEntregueDono, 'dono')}
                  disabled={disabledButtons.has(`recursoEntregue2-${res.ReservaID}`)}
                >
                  {res.RecursoEntregueDono ? 'Sim' : 'Não'}
                </button>
              ),
              'Caucao Recebida': (
                <button
                  className="btnConfirmacoes"
                  onClick={() => handleUpdate(res.ReservaID, 'caucaoEntregue2', !res.ConfirmarCaucaoDono, 'dono')}
                  disabled={disabledButtons.has(`caucaoEntregue2-${res.ReservaID}`)}
                >
                  {res.ConfirmarCaucaoDono ? 'Sim' : 'Não'}
                </button>
              ),
              'Confirmar Estado Recurso': (
                <>
                  <Button onClick={() => handleUpdate(res.ReservaID, 'bomEstado', true, 'dono')} className="btnSimReserva">Sim</Button>
                  <Button onClick={() => { setSelectedReservaID(res.ReservaID); setShowModal(true); }} className="btnNaoReserva">Não</Button>
                </>
              )
            }))}
            mensagemVazio="Nenhuma reserva encontrada."
          />
        </div>
  
        {showModal && (
          <>
            <div className={styles.modalbackdrop} onClick={() => setShowModal(false)} />
            <div className={styles.modalcontent}>
              <h2>Enviar Justificação</h2>
              <textarea
                placeholder="Descrição"
                value={newResource.justification}
                onChange={(e) => setNewResource({ ...newResource, justification: e.target.value })}
              />
              <div>
                <Button onClick={() => handleJustification(selectedReservaID)}>Enviar</Button>
                <Button onClick={() => setShowModal(false)}>Cancelar</Button>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MeusPedidosReserva;
