import React from "react";
import {Link} from "react-router-dom";

const style={
    height:"100vh",
    backgroundImage:"url('https://www.decathlon.cl/modules/ps_imageslider/images/58da9df6d954063b69c67b4b047af5e00c98a652_respira-deporte-1.jpg')",
    backgroundSize:"cover"
}

function Home(){
   return( 
       <Link to="/products">
   <main style={style}></main>
   </Link>
   )
}

export default Home