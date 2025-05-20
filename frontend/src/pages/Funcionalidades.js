import React from "react";
import "../styles/Funcionalidades.css";
import Navbar from "../components/Navbar.js";

function Funcionalidades() {
  return (
  <div className="page-content">
    <div className="home-containerMenu">
      <Navbar />

      <div className="funcionalidades-container">
        <h1 className="titulo">Funcionalidades do Sistema</h1>

        <p className="descricao">
          Este sistema foi desenvolvido para promover a colaboração entre vizinhos, facilitando a gestão de recursos comuns de forma simples, transparente e eficiente. Conheça abaixo as principais funcionalidades:
        </p>

        <div className="cards-container">
          <div className="func-card">
            <h2>📅 Reserva de Recursos</h2>
            <p>Permite que vizinhos reservem recursos disponíveis como materiais, ferramentas ou equipamentos, de forma organizada e com controlo.</p>
          </div>

          <div className="func-card">
            <h2>➕ Pedido de Novos Recursos</h2>
            <p>Os residentes podem sugerir e solicitar a aquisição de novos recursos que considerem úteis para o prédio.</p>
          </div>

          <div className="func-card">
            <h2>🛠️ Manutenção de Recursos</h2>
            <p>Os residentes podem reportar problemas e solicitar manutenção de recursos comuns como churrasqueiras, salas, elevadores, entre outros.</p>
          </div>

          <div className="func-card">
            <h2>🗳️ Votação em Orçamentos</h2>
            <p>Os utilizadores podem votar nas propostas de orçamento apresentadas para aquisição ou manutenção de recursos.</p>
          </div>

          <div className="func-card">
            <h2>✨ Outras Funcionalidades</h2>
            <p>Notificações automáticas e entre outras.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Funcionalidades;
