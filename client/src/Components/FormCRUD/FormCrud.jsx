import React, { useEffect } from "react";
import NavBarAdmin from "../NavBar/NavBarAdmin";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct,getProducts } from "../../redux/actions";
import AsignarProducto from "./AsignarProducto"
import EliminarAsignacion from "./EliminarAsignacion"

function FormCrud() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function eliminar(id) {
    dispatch(removeProduct(id));
  }
  useEffect(()=>{
    dispatch(getProducts())
  },[])

  if(user&&user.role==="admin"){
  return (
    <React.Fragment>
      <NavBarAdmin />
      <div>
        {products &&
          products.map((p) => (
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <ul class="list-group shadow">
                  <li class="list-group-item">
                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                      <div class="media-body order-2 order-lg-1">
                        <h2 class="mt-0 font-weight-bold mb-2">
                          {p.name} Id:{p.id}
                        </h2>
                        <p class="font-italic text-muted mb-0 large">
                          {p.description}
                        </p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <h3 class="font-weight-bold my-2">${p.price}</h3>
                          <h5 class="font-weight-bold my-2">
                            Stock: {p.stock}
                          </h5>
                          <h5 class="font-weight-bold my-2">Talle: {p.size}</h5>

                          <ul class="list-inline small">
                            <li class="list-inline-item m-0">
                              <i class="fa fa-star text-success"></i>
                            </li>
                            <li class="list-inline-item m-0">
                              <i class="fa fa-star text-success"></i>
                            </li>
                            <li class="list-inline-item m-0">
                              <i class="fa fa-star text-success"></i>
                            </li>
                            <li class="list-inline-item m-0">
                              <i class="fa fa-star text-success"></i>
                            </li>
                            <li class="list-inline-item m-0">
                              <i class="fa fa-star-o text-gray"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <img
                        src={p.image}
                        alt={p.name}
                        width="200"
                        class="ml-lg-5 order-1 order-lg-2"
                      />
                    </div>
                    <span style={{ position: "-webkit-sticky", right: 0 }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminar(p.id)}
                      >
                        Eliminar
                      </button>
                      <Link to={"edit/product/" + p.id}>
                        <button className="btn btn-warning">Editar</button>
                      </Link>
                    </span>
                    <span />
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
      <AsignarProducto/>
      <EliminarAsignacion/>
    </React.Fragment>
  );}
  else {
    return <h2 className="mt-4">Tienes que ser administrador para ver el contenido de esta página</h2>
  }
}

export default FormCrud;
