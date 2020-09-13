import React from 'react';
import './NavBarAdmin.css';
import { Link } from 'react-router-dom';

function NavBarAdmin() {
  return (
    <div className="containerNavAdmin">
    <div className="NavbarAdmin">
      <Link className="option" to="/admin">
        Inicio
      </Link>
      <Link className="option" to="/admin/orders">
        Ordenes
      </Link>
      <Link className="option" to="/admin/newProduct">
        Crear Producto
      </Link>
      <Link className="option" to="/admin/myProducts">
        Mis Productos
      </Link>
      <Link className="option" to="/admin/categories">
        Mis Categorias
      </Link>
    </div>
    </div>
  )
}

export default NavBarAdmin;