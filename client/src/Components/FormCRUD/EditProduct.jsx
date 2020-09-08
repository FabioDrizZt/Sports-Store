import React,{useState,useEffect} from "react";
import { updateProduct } from "../../actions/index";
import { useDispatch } from "react-redux";

function EditProduct (props){
    const dispatch = useDispatch();
    const idProduct = props.match.match.params.id;
    const [editProduct, setEditProduct] = useState(null); 

    const [input,setInput] = useState(null);
        // name:editProduct.name,
        // description: editProduct.description,
        // size: editProduct.size,
        // stock: editProduct.stock,
        // price: editProduct.price,
        // image: editProduct.image
    
      
    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
          });
      }

    useEffect(() => {
        fetch("http://localhost:3001/products/"+idProduct)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            setInput(data);           
        });
    }, []);

    
    function sendData (e){       
        e.preventDefault();
        dispatch(updateProduct(idProduct,input))
    }

    return(
        input&&<form onSubmit={(e)=>sendData(e)}>
            <legend>Editar Producto</legend>           
            <div className="form-group">
                <label for="name">Nombre</label> 
                <input type="text" id="name" name="name" value={input.name} 

                onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label for="description">Descripción</label> 
                <input type="text" id="description" name="description" value={input.description} 
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
               <label for="precio">Precio</label> 
                <input type="number" id="price" name="price" value={input.price} 
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
               <label for="stock">Stock</label> 
                <input type="number" id="stock" name="stock" value={input.stock}
                 onChange={handleInputChange}
                  />
            </div>
            <div className="form-group">
               <label for="imagen">Size</label> 
                <input type="text" id="size" name="size" value={input.size}
                 onChange={handleInputChange}
                 />
            </div>
            <div className="form-group">
               <label for="imagen">Imagen</label> 
                <input type="text" id="image" name="image" value={input.image}
                 
                 onChange={handleInputChange}/>
            </div>
            <input type="submit" value="Editar"/>
        </form>
    )
}

export default EditProduct