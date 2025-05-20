import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar2.css";

function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="navbar2">
            


            <div className="navLink">
                <ul className="links">
                    <li><Link to="/" className="link">Home</Link></li>
                    <li><Link to="/sobre" className="link">Sobre</Link></li>
                    <li><Link to="/funcionalidades" className="link">Funcionalidades</Link></li>
                    <li><Link to="/contactos"className="link">Contactos</Link></li>
                </ul>
            </div>

            <div className="right-section">
                    <button className="login-button" onClick={handleLoginClick}>Login</button>

            </div>

        
        </div>

    );
}

export default Navbar;
