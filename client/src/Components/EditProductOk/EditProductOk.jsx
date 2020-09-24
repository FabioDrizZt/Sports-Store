import React from "react";
import "antd/dist/antd.css";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function EditProductOk() {
  return (
    <div className="">
      <Result
        status="success"
        title="Producto editado con éxito!"
        subTitle="Recuerda que los cambios sobreescriben lo anterior"
        extra={[
          <Link to={"/admin/myProducts"}>
            <Button type="primary" key="console">
              Ok
            </Button>
          </Link>,
        ]}
      />
    </div>
  );
}

export default EditProductOk;