import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {removeProduct} from "../../actions/index";
import NavBarAdmin from '../NavBar/NavBarAdmin';

function FormCrud() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  function eliminar(id) {
   dispatch(removeProduct(id))
  }
  
  return (
    <React.Fragment>
        <NavBarAdmin/>
      <div>
        {products &&
          products.map((p) => (
              
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <ul className="list-group shadow">
                  <li className="list-group-item">
                    <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                      <div className="media-body order-2 order-lg-1">
                        <h2 className="mt-0 font-weight-bold mb-2">{p.name} Id:{p.id}</h2>
                        <p className="font-italic text-muted mb-0 large">
                          {p.description}
                        </p>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                          <h3 className="font-weight-bold my-2">${p.price}</h3>
                          <h5 className="font-weight-bold my-2">Stock: {p.stock}</h5>
                          <h5 className="font-weight-bold my-2">Talle: {p.size}</h5>

                          <ul className="list-inline small">
                            <li className="list-inline-item m-0">
                              <i className="fa fa-star text-success"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fa fa-star text-success"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fa fa-star text-success"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fa fa-star text-success"></i>
                            </li>
                            <li className="list-inline-item m-0">
                              <i className="fa fa-star-o text-gray"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <img
                        src={p.image}
                        alt={p.name}
                        width="200"
                        className="ml-lg-5 order-1 order-lg-2"
                      />
                    </div>
                    <span style={{ position:"-webkit-sticky" , right: 0 }}>
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
                    <span/>
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

export default FormCrud;
