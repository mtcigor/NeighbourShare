import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Registar from "./pages/Registar.js";
import Admin from "./pages/Admin.js"
import Menu from "./pages/Menu.js"
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext.js";
import "./App.css";
import RecursosDisponiveis from "./pages/RecursosDisponiveis.js";
import PedidosNovosRecursos from "./pages/PedidosNovosRecursos.js";
import PedidosReserva from "./pages/PedidosReserva.js";
import Perfil from "./pages/Perfil.js";
import MeusRecursos from "./pages/MeusRecursos.js";
import ListaPedidosReserva from "./pages/ListaPedidosReserva.js";
import ListaReserva from "./pages/ListaReservas.js";
import RealizarPedidoNovoRecurso from "./pages/RealizarPedidoNovoRecurso.js";
import RealizarPedidoManutencao from "./pages/RealizarPedidoManutencao.js";
import PedidosManutencao from "./pages/PedidosManutencao.js";
import Notificacoes from "./pages/Notificacoes.js";
import Orcamentos from "./pages/Orcamentos.js";
import Manutencao from "./pages/Manutencao.js";
import Votacoes from "./pages/Votacoes.js";
import ConsultarVotacao from "./pages/ConsultarVotacao.js";
import PedidosNovosRecursosPendentesVoto from "./pages/PedidosNovosRecursosPendentesVoto.js";
import AtualizarDados from "./pages/AtualizarDados.js";
import RecuperarPass from "./pages/RecuperarPass.js";
import Exemplo from "./pages/Exemplo.js";
import EntidadeExterna from "./pages/EntidadeExterna.js";
import RecursosComuns from "./pages/RecursosComuns.js";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>}/>
            <Route path="/registar" element={<ProtectedRoute allowedRoles={["admin"]}><Registar /></ProtectedRoute>}/>
            <Route path="/menu" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><Menu /></ProtectedRoute>}/>
            <Route path="/recursosDisponiveis" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><RecursosDisponiveis /></ProtectedRoute>}/>
            <Route path="/pedidosNovosRecursos" element={<ProtectedRoute allowedRoles={["gestor", "admin"]}><PedidosNovosRecursos /></ProtectedRoute>}/>
            <Route path="/pedidosReserva/:id" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><PedidosReserva /></ProtectedRoute>}/>
            <Route path="/perfil" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><Perfil /></ProtectedRoute>}/>
            <Route path="/meusRecursos" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><MeusRecursos /></ProtectedRoute>}/>
            <Route path="/listaPedidosReserva" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><ListaPedidosReserva /></ProtectedRoute>}/>
            <Route path="/listaReserva" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><ListaReserva /></ProtectedRoute>}/>
            <Route path="/realizarPedidoNovoRecurso" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><RealizarPedidoNovoRecurso /></ProtectedRoute>}/>
            <Route path="/realizarPedidoManutencao" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><RealizarPedidoManutencao /></ProtectedRoute>}/>
            <Route path="/pedidosManutencao" element={<ProtectedRoute allowedRoles={["gestor", "admin"]}><PedidosManutencao /></ProtectedRoute>}/>
            <Route path="/notificacoes" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><Notificacoes /></ProtectedRoute>}/>
            <Route path="/orcamentos" element={<ProtectedRoute allowedRoles={["gestor", "admin"]}><Orcamentos /></ProtectedRoute>}/>
            <Route path="/manutencao" element={<ProtectedRoute allowedRoles={["gestor", "admin"]}><Manutencao /></ProtectedRoute>}/>
            <Route path="/votacoes" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><Votacoes /></ProtectedRoute>}/>
            <Route path="/consultarVotacao/:id" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><ConsultarVotacao  /></ProtectedRoute>}/>
            <Route path="/pedidosNovosRecursosPendentesVoto" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><PedidosNovosRecursosPendentesVoto  /></ProtectedRoute>}/>
            <Route path="/atualizarDados" element={<AtualizarDados  />}/>
            <Route path="/recuperarPass" element={<RecuperarPass  />}/>
            <Route path="/entidadeExterna" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><EntidadeExterna /></ProtectedRoute>}/>
            <Route path="/exemplo" element={<ProtectedRoute allowedRoles={["residente","gestor", "admin"]}><Exemplo /></ProtectedRoute>}/>
            <Route path="/recursosComuns" element={<ProtectedRoute allowedRoles={["gestor", "admin"]}><RecursosComuns /></ProtectedRoute>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
