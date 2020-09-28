import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, promoteUser, removeUser } from "../../redux/actions";
import NavBarAdmin from "../NavBar/NavBarAdmin";

function UserCrud() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

if(user&&user.role==="admin"){
  return (
    <React.Fragment>
      <NavBarAdmin />
      <div>
        {users&&
          users.map((u) => (
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <ul className="list-group shadow">
                  <li className="list-group-item">
                    <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                      <div className="media-body order-2 order-lg-1">
                        <h2 className="mt-0 font-weight-bold mb-2">
                          {u.name} {u.lastName} Id:{u.id}
                        </h2>
                        <p class="font-italic text-muted mb-0 large">
                          {u.description}
                        </p>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                          <h3 className="font-weight-bold my-2">DNI:{u.DNI}</h3>
                          <h5 className="font-weight-bold my-2">
                            email: {u.email}
                          </h5>
                          <h5 class="font-weight-bold my-2">Role: {u.role}</h5>
                        </div>
                      </div>
                      {/*     <img
                        src={u.image}
                        alt={u.name}
                        width="200"
                        class="ml-lg-5 order-1 order-lg-2"
                      /> */}
                    </div>
                    <span style={{ position: "-webkit-sticky", right: 0 }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => dispatch(removeUser(u.id))}
                      >
                        Eliminar
                      </button>
                      {/* <Link to={"edit/user/" + u.id}>
                        <button className="btn btn-warning">Editar</button>
                      </Link> */}
                    </span>
                    <span />
                    <button
                      className="btn btn-primary"
                      onClick={() => {                       
                        dispatch(promoteUser(u.id));
                      }}
                    >
                      Hacerlo Admin
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  )}
  else{
    return <h2 className="mt-4">Tienes que ser administrador para ver el contenido de esta página</h2>
  }
}

export default UserCrud;
