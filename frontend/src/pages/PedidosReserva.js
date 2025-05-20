import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/PedidosReserva.css";
import Navbar2 from "../components/Navbar2.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button.js';

const ReservarRecurso = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/recursos/${id}`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReserve = async () => {
    const formData = new FormData();
    formData.append('recurso_id', id);
    formData.append('data_inicio', startDate);
    formData.append('data_fim', endDate);

    try {
      const res = await fetch('http://localhost:8000/api/reserva/pedidosreserva/criar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (res.ok) {
        alert('Reserva realizada com sucesso!');
      } else {
        alert('Erro ao realizar reserva.');
      }
    } catch (error) {
      console.error('Erro ao enviar reserva:', error);
      alert('Erro ao enviar reserva.');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Erro ao carregar o produto.</div>;
  }

  return (
    <div className="page-content">
      <Navbar2 />
      <div className='home-containerReservas'>

        <div key={product.RecursoID} className="image-section">
          <img src={product.Image} alt={product.name} />
        </div>

        <div key={product.RecursoID} className="details-section">
          <h2>Nome do Produto: {product.Nome}</h2>
          <h2>Categoria do Produto: {product.Categoria_.DescCategoria}</h2>
          <h2>Caução: {product.Caucao}€</h2>
          
          <div className="centrados">
          <label>Data Início: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
          <label>Data Fim: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></label>
          <Button onClick={handleReserve} className="btn-base">Reservar!</Button>
          </div>
          
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default ReservarRecurso;
