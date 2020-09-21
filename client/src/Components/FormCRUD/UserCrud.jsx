import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsers,promoteUser,removeUser} from "../../redux/actions/index"
import NavBarAdmin from '../NavBar/NavBarAdmin'

// const style = {
//   width: "50%",
//   margin: "2rem auto",
//   position: "relative",
// };

function UserCrud() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  const [userId,setUserId] = useState(null)
  const userFind = users&&users.find(x=>x.id===userId);

  useEffect(()=>{
    dispatch(getUsers())
  },[userFind&&userFind.role])

  return (
    <React.Fragment>
      <NavBarAdmin />
      <div>
        {users && user.role==="admin" &&
          users.map((u) => (
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <ul class="list-group shadow">
                  <li class="list-group-item">
                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                      <div class="media-body order-2 order-lg-1">
                        <h2 class="mt-0 font-weight-bold mb-2">{u.name} {u.lastName} Id:{u.id}</h2>
                        <p class="font-italic text-muted mb-0 large">
                          {u.description}
                        </p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <h3 class="font-weight-bold my-2">DNI:{u.DNI}</h3>
                          <h5 class="font-weight-bold my-2">email: {u.email}</h5>
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
                    <span style={{ position:"-webkit-sticky" , right: 0 }}>
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
                    <span/>
                    <button className="btn btn-primary"
                    onClick={()=>{    
                      setUserId(u.id);               
                      dispatch(promoteUser(u.id))}}
                    >Hacerlo Admin</button>
                  </li>
                </ul>               
              </div>             
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

export default UserCrud;
