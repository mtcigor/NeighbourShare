import React from 'react';
import '../styles/Contactos.css'; // Import do CSS externo
import Navbar from "../components/Navbar.js";

function Contactos() {
  return (
    <div className="page-content">
      <div className="home-containerMenu">

      <Navbar />
        <p className="menu-title">Contactos</p>
        <p>Tem dúvidas, sugestões ou precisa de ajuda? Entre em contacto connosco através dos difersos métodos de contacto abaixo.</p>

      <div className="contact-info">
        <h2>Informações de Contacto</h2>
        <p><strong>Email:</strong> apoio@comunidadereservas.pt</p>
        <p><strong>Telefone:</strong> +351 912 345 678</p>
        <p><strong>Morada:</strong> Rua do IPCA, 123, 1000-000 Barcelos</p>
      </div>
      </div>
    </div>

  );
}

export default Contactos;
