import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "../styles/Menu.css";
import Navbar2 from "../components/Navbar2.js";

function Residente() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <Navbar2 />
      <div className="home-containerMenu">
        <p className="menu-title">Menu Principal</p>
        <div className="card-grid">
          <div className="card">
            <img src="img/notificacoes_back.jpeg" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/notificacoes">Notificações</Link><br />
          </div>
          <div className="card">
            <img src="img/pedidos_reserva.jpeg" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/listaPedidosReserva">Pedidos de Reserva</Link><br />
          </div>
          <div className="card">
            <img src="img/reservas.jpg" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/listaReserva">Reservas</Link><br />
          </div>
          <div className="card">
            <img src="img/meus_recursos.png" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/meusRecursos">Meus Recursos</Link><br />
          </div>
          <div className="card">
            <img src="img/pedido_manutencao.jpeg" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/realizarPedidoManutencao">Realizar Pedido Manutenção</Link><br />
          </div>
          <div className="card">
            <img src="img/pedido_novo_rec.png" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/realizarPedidoNovoRecurso">Realizar Pedido Novo Recurso</Link><br />
          </div>
          <div className="card">
            <img src="img/recursos_disp.jpeg" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/recursosDisponiveis">Recursos Disponíveis</Link><br />
          </div>
          <div className="card">
            <img src="img/votacoes.jpeg" alt="Descrição" className="card-img" />
            <Link className="card-text" to="/votacoes">Votações</Link><br />
          </div>
          

          {/* Apenas Gestores */}
          {user?.role === "gestor" && (
            <>
              <div className="card">
                <img src="img/manutencao.jpg" alt="Descrição" className="card-img" />
                <Link className="card-text" to="/manutencao">Manutenções</Link><br />
              </div>
              <div className="card">
                <img src="img/entidades.jpg" alt="Descrição" className="card-img" />
                <Link className="card-text" to="/entidadeExterna">Entidades Externas</Link><br />
              </div>
              <div className="card">
                <img src="img/orcamentos.png" alt="Descrição" className="card-img" />
                <Link className="card-text" to="/orcamentos">Orçamentos</Link><br />
              </div>
              <div className="card">
                <img src="img/pedidos_manutencoes.jpeg" alt="Descrição" className="card-img" />
                <Link className="card-text" to="/pedidosManutencao">Pedidos Manutenção</Link><br />
              </div>
              <div className="card">
                <img src="img/pedidos_novos_rec.jpg" alt="Descrição" className="card-img" />
                <Link className="card-text" to="/pedidosNovosRecursos">Pedidos Novos Recursos</Link><br />
              </div>
              <div className="card">
                <img src="img/rec_comum.jpg" alt="Descrição" className="card-img" />
                <Link className="card-text" to="/recursosComuns">Recursos Comuns</Link><br />
              </div>
            </>
          )}

          {/* Apenas Admins */}
          {user?.role === "admin" && (
            <>
              <div className="card">
                <img src="img/registar.jpg" alt="Descrição" className="card-img" />
                <Link className="card-text" to="/registar">Registar</Link><br />
              </div>
            </>
          )}

        </div>
      </div>
    </div>

  );
}

export default Residente;
