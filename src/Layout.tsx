import { Outlet,Link } from 'react-router-dom';
import './Diseño/Layout.css'
const Layout = () => {
  return (
    <>
    <nav className="navBar">
    <div className="NavBar-Contenedor">
    <div className="Links" >
    <Link to="/">Home</Link>
    <Link to="/crear-pedido">Crear Pedido</Link>
    <Link to="/listado">Lista de pedidos</Link>
    </div>
    </div>
    </nav>
    <Outlet/>
    <footer>
    <p>Hecho por Valentino Ekes</p>
    </footer>
    </>
  );
};

export default Layout;
