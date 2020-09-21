import React, { useState } from "react";
import { useDispatch } from "react-redux";

// S72 : Crear Componente de Checkout, donde se ingrese 
// la direccion de envio y se confirme la compra.

const Checkout = () => {

const [input, setInput] = useState([]);
const dispatch = useDispatch
function submitAddress(e ,input) {
  e.preventDefault()
  // dispatch(createPruduct(input))
}

  return (
    
    <>
      <form
        onSubmit={e => {
          submitAddress(e, input);
        }}
      >
        <h3>Estamos a punto de finalizar tu orden</h3>
        <div className="container form-group col-6">
          <label for="labelAddress">¿A dónde enviamos tu orden?</label>
          <input required value={input.ciudad} onChange={e => setInput({...input, ciudad: e.target.value })} name="ciudad" type="text" className="form-control" id="ciudad" placeholder="Ciudad..."></input>
          <input required value={input.provincia} onChange={e => setInput({...input, provincia: e.target.value })} name="provincia" type="text" className="form-control" id="provincia" placeholder="Provincia..."></input>
          <input required value={input.localidad} onChange={e => setInput({...input, localidad: e.target.value })} name="localidad" type="text" className="form-control" id="localidad" placeholder="Localidad..."></input>
          <input required value={input.cp} onChange={e => setInput({...input, cp: e.target.value })} name="cp" type="text" className="form-control" id="cp" placeholder="Código Postal..."></input>
          <label for="labelAddress">Hablanos sobre tu dirección</label>
          <input required value={input.calle} onChange={e => setInput({...input, calle: e.target.value })} name="calle" type="text" className="form-control" id="calle" placeholder="Calle..."></input>
          <input required value={input.altura} onChange={e => setInput({...input, altura: e.target.value })} name="altura" type="text" className="form-control" id="altura" placeholder="Altura..."></input>
          <input required value={input.departamento} onChange={e => setInput({...input, departamento: e.target.value })} name="departamento" type="text" className="form-control" id="departamento" placeholder="Departamento..."></input>
          <input required value={input.receptor} onChange={e => setInput({...input, receptor: e.target.value })} name="receptor" type="text" className="form-control" id="receptor" placeholder="¿Quién recibe el pedido?"></input>

        </div>
        <button className="btn btn-primary">Confirmar</button>
      </form>
    </>
  );
};

export default Checkout;


// Ciudad
// provincia
// localidad
// Codigo postal = cp
// calle
// altura
// departamento 9/16
// Nombre de quien recibe = receptor
//________________________
//       EXTRAS
// Datos de la tarjeta
// Modo Efectivo
// 
//
//
//
//