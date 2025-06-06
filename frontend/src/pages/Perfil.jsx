import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ToastManager from '../components/ToastManager.jsx';
import Navbar2 from "../components/Navbar2.jsx";
import Input from '../components/Input.jsx';
import "../styles/Perfil.css";
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [newFieldValue, setNewFieldValue] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/perfil", {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar perfil');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('Tem a certeza que deseja eliminar a conta?');
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8000/api/delete?email=${user.email}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erro ao eliminar conta');
      }

      alert('Conta eliminada com sucesso!');
      setShowModal(false);
      navigate('/login'); // ou outra página adequada
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível eliminar a conta.');
    }
  };

  const handleEditField = (field) => {
    setEditingField(field);
    setNewFieldValue(user[field]);
  };

  const handleSaveField = async () => {
    try {
      
const updatedUser = {
   ...user,
   [editingField]: newFieldValue
  };
  
      const response = await fetch("http://localhost:8000/api/user/update", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar campo');
      }

      setUser(updatedUser);
      setEditingField(null);

      ToastManager.success('Campo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      ToastManager.error('Não foi possível atualizar o campo.');
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="home-container">
        <div className='fundoPerfil'>
          <div className='itensPerfil'>
            <div className='textosPerfil'>
              <img className='fotoPerfil' src={user?.imagem} alt="Foto"></img>
            </div>

            <div className='textosPerfil'>
              <p>Utilizador</p>
              {editingField === 'nome' ? (
                <Input value={newFieldValue} onChange={(e) => setNewFieldValue(e.target.value)} type="text" onBlur={handleSaveField} variant="default"/>
              ) : (
                <p className='infoUser'>{user?.nome} <img className='lapisEdit' src="/img/lapis.png" alt="Editar" onClick={() => handleEditField('nome')} /></p>
              )}
            </div>

            <div className='textosPerfil'>
              <p>Email</p>
              <p className='infoUser'>{user?.email}</p>
            </div>

            <div className='textosPerfil'>
              <p>Contacto</p>
              {editingField === 'contacto' ? (
                <Input value={newFieldValue} onChange={(e) => setNewFieldValue(e.target.value)} type="text" onBlur={handleSaveField} variant="default"/>
              ) : (
                <p className='infoUser'>{user?.contacto} <img className='lapisEdit' src="/img/lapis.png" alt="Editar" onClick={() => handleEditField('contacto')} /></p>
              )}
            </div>

            <div className='textosPerfil'>
              <p>Data de Nascimento</p>
              {editingField === 'data_nascimento' ? (
                <Input value={newFieldValue} onChange={(e) => setNewFieldValue(e.target.value)} type="text" onBlur={handleSaveField} variant="default"/>
              ) : (
                <p className='infoUser'>{user?.data_nascimento} <img className='lapisEdit' src="/img/lapis.png" alt="Editar" onClick={() => handleEditField('data_nascimento')} /></p>
              )}
            </div>
          </div>
        </div>

        <button className="btn-deletePerfil" onClick={() => setShowModal(true)}>Eliminar Conta</button>

        {showModal && (
          <>
            <div className="modal-backdropDelete" onClick={() => setShowModal(false)} />
            <div className="modal-contentDelete">
              <h2>Tem a certeza que deseja eliminar a sua conta!</h2>
              <div>
                <button onClick={handleDeleteAccount}>Eliminar</button>
                <button onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default ProfilePage;
