import React from "react";
import "../styles/Sobre.css";
import Navbar from "../components/Navbar.js";

function Sobre() {
  return (
  <div className="page-content">
    <div className="home-containerMenu">
      <Navbar />

      <div className="sobre-container">
        <section className="intro">
          <h1>Sobre a DEVESI</h1>
          <p>
            A <strong>DEVESI</strong> é uma empresa dedicada ao desenvolvimento de soluções tecnológicas que promovem a inovação social, a sustentabilidade e a eficiência comunitária.
          </p>
        </section>

        <section className="projeto">
          <h2>O Projeto: NeighbourShare</h2>
          <p>
            <strong>NeighbourShare</strong> é uma plataforma criada com o objetivo de facilitar a partilha e gestão de recursos entre vizinhos. Com esta solução, promovemos uma cultura de colaboração, reduzimos desperdícios e aumentamos a acessibilidade a equipamentos e espaços comuns.
          </p>
        </section>

        <section className="objetivos">
          <h2>Objetivos do Projeto</h2>
          <ul>
            <li>🔁 Promover o reaproveitamento de recursos dentro da comunidade.</li>
            <li>🤝 Incentivar a cooperação entre vizinhos e o espírito de entreajuda.</li>
            <li>💡 Facilitar a reserva e utilização de espaços e objetos comuns.</li>
            <li>🛠️ Agilizar pedidos de manutenção e aquisição de novos recursos.</li>
            <li>🗳️ Garantir transparência na tomada de decisões através de votações em orçamentos.</li>
          </ul>
        </section>

        <section className="valores">
          <h2>Os Nossos Valores</h2>
          <p>
            Na DEVESI, acreditamos na tecnologia como motor de mudança positiva. Valorizamos a <strong>inovação com propósito</strong>, o <strong>compromisso com a comunidade</strong> e a <strong>responsabilidade ambiental</strong>.
          </p>
        </section>
      </div>
    </div>
  </div>
  );
}

export default Sobre;
