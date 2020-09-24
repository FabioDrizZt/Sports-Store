import React from "react";
import "antd/dist/antd.css";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function Buyok() {
  return (
    <div className="">
      <Result
        status="success"
        title="Felicidades por realizar tu compra"
        subTitle="En tu bandeja de correo electrónico encontrarás un mensaje con los datos de tu compra"
        extra={[
          <Link to={"/auth/me"}>
            <Button type="primary" key="console">
              Ir a mi perfil
            </Button>
          </Link>,
          <Link to={"/products"}>
            <Button key="buy">Seguir comprando</Button>
          </Link>,
        ]}
      />
    </div>
  );
}

export default Buyok;
