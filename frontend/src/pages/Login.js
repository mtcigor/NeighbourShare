import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { InputLogin, InputPassword } from "../components/Inputs.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Login.css";
import Button from '../components/Button.js';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const res = await fetch("http://localhost:8000/api/me", {
          credentials: "include",
        });
        const userData = await res.json();
        setUser(userData);

        if (userData.role === "admin") {
          navigate("/menu");
        } else if (userData.role === "residente" || userData.role === "gestor") {
          navigate("/menu");
        } else {
          navigate("/login");
        }
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError("Erro");
    }
  };

  const handleRecuperacaoSenha = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/password/forgot", { // endpoint para recuperação de senha
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRecuperacao }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success('Email de recuperação enviado com sucesso!');
        setShowModal(false);
      } else {
        toast.error('Erro ao enviar email de recuperação.');
      }
    } catch (error) {
      toast.error('Erro ao enviar email de recuperação.');
    }
  };

  return (
    <div className="container-login">
      <div className="container-esquerda">
        <h1>Bem-vindo de volta!</h1>
        <div className="container-formulario">
          <form className="formulario" onSubmit={handleSubmit}>
            <h2>Acesse a sua conta!</h2>
            <div className="container-center">
              <InputLogin
                name={"email"}
                value={formData.email}
                onChange={handleChange}
              />
              <InputPassword
                name={"password"}
                value={formData.password}
                onChange={handleChange}
              />
              <div className="container-btn">
                <Button className="btn" type="submit">Login</Button>
              </div>
              <p className="erro">{error && error}</p>
              <p className="link-recuperacao" onClick={() => setShowModal(true)}>Esqueceu a senha?</p>
            </div>
          </form>
        </div>
      </div>
      <div className="container-direita">
        <img className="imagem" src="img/fundo.jpg" alt="Imagem" />
      </div>
      {showModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowModal(false)} />
          <div className="modal-content">
            <h3>Recuperação de Senha</h3>
            <p>Digite seu email para receber instruções de recuperação de senha.</p>
            <input
              type="email"
              name="emailRecuperacao"
              value={emailRecuperacao}
              onChange={(e) => setEmailRecuperacao(e.target.value)}
              placeholder="Email"
            />
            <Button onClick={handleRecuperacaoSenha}>Enviar</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
