import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/index.js";

const CreateUser = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    DNI: "",
    email: "",
    password: "",
    role: "usuario",
  });

  function User(e, input) {
    e.preventDefault();
    dispatch(createUser(input));
    setInput({
      name: "",
      lastName: "",
      DNI: "",
      email: "",
      password: "",
      role: "usuario",
    });
  }

  return (
    <div className="containerAll">
      <form className="containerPro" onSubmit={(e) => User(e, input)}>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Nombre</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nombre"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Apellido</label>
            <input
              type="text"
              class="form-control"
              placeholder="Apellido"
              value={input.lastName}
              onChange={(e) => setInput({ ...input, lastName: e.target.value })}
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Contraseña</label>
            <input
              type="password"
              class="form-control"
              placeholder="Contraseña"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label>DNI</label>
            <input
              type="text"
              class="form-control"
              placeholder="DNI"
              value={input.DNI}
              onChange={(e) => setInput({ ...input, DNI: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
