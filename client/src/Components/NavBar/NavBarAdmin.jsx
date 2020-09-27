import React from 'react';
import './NavBarAdmin.css';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavBarAdmin() {
  const user = useSelector((state) => state.user);
  if(user.role==="admin"){
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
      <Link className="option" to="/admin/users">
        Usuarios
      </Link>
    </div>
    </div>
  )}
}

export default NavBarAdmin;