import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "../components/Navbar.js";

function Home() {
  return (
  <div className="page-content">
    <div className="home-containerMenu">
      <Navbar />

      <div className="home-container2">
        <header className="home-hero">
          <h1>Bem-vindo ao NeighbourShare</h1>
          <p>Partilha de recursos entre vizinhos de forma simples, justa e eficiente.</p>
          <Link to="/contactos"><button className="cta-button">Fala connosco</button></Link>
        </header>

        <section className="home-section">
          <h2>O que é o NeighbourShare?</h2>
          <p>
            NeighbourShare é uma plataforma criada pela DEVESI para facilitar a gestão e partilha de recursos numa comunidade de vizinhos. 
            Promove a colaboração, reduz custos e melhora a qualidade de vida.
          </p>
        </section>

        <section className="home-section highlights">
          <h2>Funcionalidades Principais</h2>
          <div className="cards">
            <div className="card">
              <h3>📅 Reserva de Recursos</h3>
              <p>Reserva rápida e transparente de equipamentos e materiais comunitários.</p>
            </div>
            <div className="card">
              <h3>🛠️ Pedidos de Manutenção</h3>
              <p>Solicita e acompanha manutenções em tempo real de recursos comuns.</p>
            </div>
            <div className="card">
              <h3>🗳️ Votação em Orçamentos</h3>
              <p>Participa nas decisões da comunidade com votações justas e seguras.</p>
            </div>
            <div className="card">
              <h3> Sugestão de Novos Recursos</h3>
              <p>Propõe novos recursos para aquisição, com aprovação da comunidade.</p>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <p>&copy; {new Date().getFullYear()} DEVESI | Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  </div>
  );
}

export default Home;
