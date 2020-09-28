import React, { useEffect } from "react";
import { addtoCart, getOrders } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";
import ariel from './imagenes/ariel.jpeg'
import victor from './imagenes/victor.jpg'
import tomas from './imagenes/tomas.jpeg'
import gabriel from './imagenes/gabriel.jpeg'


function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  // Carrito LocalStore
  // Si no existe lo crea vacio
  JSON.parse(localStorage.getItem("myCart")) ??
    localStorage.setItem("myCart", JSON.stringify([]));
  // Guardamos los valores de las ordenes en la variable myCart como un arreglo
  const myCart = JSON.parse(localStorage.getItem("myCart"));

  useEffect(() => {
    dispatch(getOrders("abierta"));
    return () => {
      if (user.id && myCart.length >= 1 && cart.length === 0) {
        myCart.map((order) => {
          dispatch(
            addtoCart(user.id, {
              productId: order.id,
              price: order.product.price,
              amount: order.amount,
            })
          );
        });
        localStorage.setItem("myCart", JSON.stringify([]));
      }
    };
  }, []);

return(
  <div>
    <header>
      <div id="intro" className="view">
        <div className="mask rgba-black-strong">
          <div className="container-fluid d-flex align-items-center justify-content-center h-100">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-md-10">
              <h2 className="textColor display-4 font-weight-bold white-text pt-5 mb-2">Sports Store</h2>
              <hr className="hr-light"/>
              <h4 className="textColor white-text my-4">Sé feliz haciendo deportes.
              Nosotros te apoyamos.
              </h4>
              <Link to="/products">
              <button type="button" className="textColor btn btn-outline-white">Ver más<i className="fa fa-book ml-2"></i></button>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </header>

    <main className="mt-5">
      <div className="container">
        <section id="best-features" className="text-center">
        <h2 className="mb-5 font-weight-bold">Trabajamos para ti.</h2>    
          <div className="row d-flex justify-content-center mb-4">
            <div className="col-md-8">
              <p className="grey-text">Tenemos los mejores productos deportivos y al mejor precio
                        para
                        que puedas cumplir
                        las metas mas ambisiosas que tengas en el mundo del deporte. Luce bien
                        haciendo
                        lo que mas te gusta.
              </p>
            </div>
          </div>

          <div className="row">   
            <div className="col-md-4 mb-5">
            <i className="fas fa-4x fa-shopping-cart orange-text"></i>
              <h4 className="my-4 font-weight-bold">Selecciona</h4>
              <p className="grey-text">Toma todo lo que necesitas para mejorar tu vida
                        y llevatelo a casa,
                        o si deseas, nosotros te lo llevamos a casa.
                        
              </p>
            </div>
  
            <div className="col-md-4 mb-1">
              <i className="fa fa-heart fa-4x red-text"></i>
              <h4 className="my-4 font-weight-bold">Sé feliz</h4>
              <p className="grey-text">Deseamos que seas feliz haciendo la actividad deportiva que mas amas.
                  además, no está de más que te veas bien mientras lo haces.
              </p>
            </div>
  
            <div className="col-md-4 mb-1">
                <i className="fa fa-bicycle fa-4x blue-text"></i>
                <h4 className="my-4 font-weight-bold">Experiencia</h4>
                <p className="grey-text">Llena tu vida de nuevas experiencias y comparte con los amigos,
                    familiares o compañeros.
                </p>
            </div>
          </div>  
        </section>


        <hr className="my-5"/>
        <section id="examples" className="text-center">
          <h2 className="mb-5 font-weight-bold">En Sports Store encontrarás</h2>
          <div className="row">    
            <div className="col-lg-4 col-md-12 mb-4">  
              <div className="view overlay z-depth-1-half">
                <img src="https://cdn.pixabay.com/photo/2018/07/22/05/16/person-3553814_960_720.jpg" className="img-fluid" alt=""/>
                <div className="mask rgba-white-slight">
                </div>
              </div>
              <h4 className="my-4 font-weight-bold">Para los mayores</h4>
              <p className="grey-text">Tenemos un amplio Stock para las personas mayores que quieren
                        alegrar su vida con el deporte.
              </p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="view overlay z-depth-1-half">
                  <img src="https://cdn.pixabay.com/photo/2018/01/16/11/43/wood-3085818_960_720.jpg" className="img-fluid" alt=""/>
                  <div className="mask rgba-white-slight"></div>
              </div>

                    <h4 className="my-4 font-weight-bold">Adultos</h4>
                    <p className="grey-text">Enriquese tu vida con la pasión del deporte. Consigue tu ropa y calzado
                    deportivo y animate a llenar de vida tus días.</p>
    
                </div>
    
                <div className="col-lg-4 col-md-6 mb-4">
    
                    <div className="view overlay z-depth-1-half">
                        <img src="https://cdn.pixabay.com/photo/2015/05/20/16/51/bike-775799_960_720.jpg" className="img-fluid" alt=""/>
                        <div className="mask rgba-white-slight"></div>
                    </div>
    
                    <h4 className="my-4 font-weight-bold">Niños</h4>
                    <p className="grey-text">Acompaña y apoya a los mas pequeños del hogar.
                    Equipalos con lo mejor aquí.</p>
    
                </div>
    
            </div>
        </section>

    
        <hr className="my-5"/>
        <section id="examples" className="text-center">
          <h2 className="mb-5 font-weight-bold">¿Quienes somos?</h2>
          <div className="row">    
            <div className="col-lg-4 col-md-12 mb-4">  
              <div className="view overlay z-depth-1-half">
                <img src={ariel} className="img-fluid" alt=""/>
                <div className="mask rgba-white-slight">
                </div>
              </div>
              <h4 className="my-4 font-weight-bold">Ariel Tecay</h4>
              <p className="grey-text">Estudio Programación que es lo que me apasiona, Finalizando la carrera en la Academia de Henry. 1
              00% Activo armando mi cv de programación y cargando proyectos.
              </p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="view overlay z-depth-1-half">
                  <img src={victor} className="img-fluid" alt=""/>
                  <div className="mask rgba-white-slight"></div>
              </div>

                    <h4 className="my-4 font-weight-bold">Victor Guiliana</h4>
                    <p className="grey-text">Ingeniero de petróleo con 5 años de experiencia en el rubro Oil&Gas que 
                    decidió dar un giro a su carrera y sumarse a la revolución tecnologíca, siendo ahora Fullstack Web Developer!.</p>
    
                </div>
    
                <div className="col-lg-4 col-md-6 mb-4">
    
                    <div className="view overlay z-depth-1-half">
                        <img src={tomas} className="img-fluid" alt=""/>
                        <div className="mask rgba-white-slight"></div>
                    </div>
    
                    <h4 className="my-4 font-weight-bold">Tomás Padrón</h4>
                    <p className="grey-text">Me gusta mucho compartir con mi familia y estudiar programación.
                    Es demasiado interesante armar un proyecto desde cero con un equipo.</p>
    
                </div>
    
            </div>
    
            <div className="row">
    
                <div className="col-lg-4 col-md-12 mb-4">
    
                    <div className="view overlay z-depth-1-half">
                        <img src="" className="img-fluid" alt=""/>
                        <div className="mask rgba-white-slight"></div>
                    </div>
    
                    <h4 className="my-4 font-weight-bold">Fabio</h4>
                    <p className="grey-text">texto de fabio.</p>
    
                </div>
    
                <div className="col-lg-4 col-md-6 mb-4">
    
                    <div className="view overlay z-depth-1-half">
                        <img src="" className="img-fluid" alt=""/>
                        <div className="mask rgba-white-slight"></div>
                    </div>
    
                    <h4 className="my-4 font-weight-bold">Marina</h4>
                    <p className="grey-text">Texto de marina</p>
    
                </div>
    
                <div className="col-lg-4 col-md-6 mb-4">
    
                    <div className="view overlay z-depth-1-half">
                        <img src="" className="img-fluid" alt=""/>
                        <div className="mask rgba-white-slight"></div>
                    </div>
    
                    <h4 className="my-4 font-weight-bold">Jose</h4>
                    <p className="grey-text">Texto de Jose</p>
    
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
    
                    <div className="view overlay z-depth-1-half">
                        <img src="" className="img-fluid" alt=""/>
                        <div className="mask rgba-white-slight"></div>
                    </div>
    
                    <h4 className="my-4 font-weight-bold"></h4>
                    <p className="grey-text"></p>
    
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
    
                    <div className="view overlay z-depth-1-half">
                        <img src={gabriel} className="img-fluid" alt=""/>
                        <div className="mask rgba-white-slight"></div>
                    </div>

                    <h4 className="my-4 font-weight-bold">Gabriel Apaza</h4>
                    <p className="grey-text">Enfrentando este nuevo desafio e incorporandome al mundo IT. 
                    Superar mis limites. Y a seguir aprendiendo. </p>

                </div>
    
            </div>
    
        </section>




        <hr className="my-5"/>
    
        <section id="gallery">
    
            <h2 className="mb-5 font-weight-bold text-center">Nuestros productos</h2>
    
            <div className="row">
    
                <div className="col-md-6 mb-4">
    
                    <div id="carousel-example-1z" className="carousel slide carousel-fade carousel-fade" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                            <li data-target="#carousel-example-1z" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner z-depth-1-half" role="listbox">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2018/06/12/20/17/football-3471402_960_720.jpg"
                                    alt="First slide"/>
                            </div>
                        
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2016/05/18/19/41/football-helmet-1401350_960_720.jpg"
                                    alt="Second slide"/>
                            </div>
                         
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2018/09/16/20/28/womens-football-3682353_960_720.jpg"
                                    alt="Third slide"/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
    
                </div>
    
                <div className="col-md-6">
    
                    <a href="" className="teal-text">
                        <h6 className="pb-1"><i className="fa fa-heart"></i><strong>¿Te gustan?</strong></h6>
                    </a>
                    <h4 className="mb-3"><strong>Puedes conseguir muchisimas cosas</strong></h4>
                    <p>Tenemos preparado para ti una variedad de productos deportivos. Entre nuestra lista podrás
                      encontrar: remeras, calzados, cascos y protección para que estés seguro practicando tu deporte.
                      Puedes encontrar pelotas, raquetas y mucho mas
                    </p>
    
                    <p>Si deseas ver todos los productos y encontrar lo que tanto buscabas y al mejor precio
                      te invitamos a hacer click en el botón
                    </p>
                    <Link to="/products"className="btn btn-primary btn-md">OK</Link>
    
                </div>
    
            </div>
    
        </section>
    
        <hr className="my-5"/>
    
        <section id="contact">
    
            <h2 className="mb-5 font-weight-bold text-center">Sé parte de Sports Store</h2>
    
            <div className="row">
    
                <div className="col-lg-7 col-md-12">
    
                    <div className="row text-center">
                    </div>
    
                    <div id="map-container" className="z-depth-1-half map-container mb-5"></div>
    
                </div>
    
            </div>
        </section>
    </div>
</main>

<footer className="page-footer font-small unique-color-dark">



<div className="container mt-5 mb-4 text-center text-md-left">
    <div className="row mt-3">

        <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
            <h6 className="text-uppercase font-weight-bold">
                <strong>Sports Store</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:60}}/>
            <p>Somos una empresa con una amplia trayectoria en el mercado deportivo. Fundada en Buenos Aires en 2005.
              Hoy en día hay sucursales en lugares como: Ojeda, Cabimas, Tucumán y Salta.
            </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">
                <strong>Products</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:60}}/>
            <p>
                <Link to="/products">Catálogo</Link>
            </p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase font-weight-bold">
                <strong>Start your experience</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:60}}/>
            <p>
                <Link to="/users">Registrate</Link>
            </p>
            <p>
                <Link to="/login">Iniciar Sesión</Link>
            </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3">
            <h6 className="text-uppercase font-weight-bold">
                <strong>Contactos</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"/>
            <p>
                <i className="fas fa-home"></i> CABA, San Francisco 2315, AR</p>
            <p>
                <i className="fa fa-envelope mr-3"></i> SportStore@soporte.com</p>
            <p>
                <i className="fa fa-phone mr-3"></i> +54 11 5555 - 4444</p>
            <p>
                <i className="fa fa-print mr-3"></i> +54 11 1234 7723</p>
        </div>

    </div>
</div>

<div className="footer-copyright text-center py-3">© 2020 Sports Store:
    <Link to="/"> SportStore.com</Link>
</div>

</footer>


  </div>
)
}

export default Home;




