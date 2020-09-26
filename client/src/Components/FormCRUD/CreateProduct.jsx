import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions";
import NavBarAdmin from "../NavBar/NavBarAdmin";
import { Redirect } from "react-router";

import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./CreateUser.css";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const CreateProduct = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(createProduct(values));
    Array.from(document.getElementsByClassName("ant-input")).forEach(
      (input) => (input.value = "")
    );
  };

  if (redirect) {
    return <Redirect to="/admin/productok" />;
  }

  return (
    <>
      <NavBarAdmin />
      <h3>Nuevo Producto</h3>
      <div className=" containerppp form-control-lg col-4">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={(values) => {
            onFinish(values);
            setTimeout(function () {
              setRedirect(true);
            }, 500);
          }}
          scrollToFirstError
        >
          {/* Nombre */}
          <Form.Item
            name="name"
            label={<span>Nombre</span>}
            rules={[
              {
                required: true,
                message: "¿Cómo se llama el producto?",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>
          {/* APELLIDO */}
          <Form.Item
            name="description"
            label={
              <span>
                <Tooltip title="Hablame sobre ese producto">
                  <QuestionCircleOutlined />
                  Descripción                   
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Es necesario dar una descripción",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Descripción" />
          </Form.Item>

          <Form.Item
            name="price"
            label={<span>Precio</span>}
            rules={[
              {
                type: "",
              },
              {
                required: true,
                message: "¿Cuánto cuesta este producto?",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!/^(?=.*\d)[0-9]{1,20}$/.test(value)) {
                    return Promise.reject("Solamente números");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Precio" />
          </Form.Item>

          {/* EMAIL */}

          <Form.Item
            name="stock"
            label={<span></span>}
            rules={[
              {
                type: "",
              },
              {
                required: true,
                message: "¿Cuántos productos de este tipo tienes?",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!/^(?=.*\d)[0-9]{1,20}$/.test(value)) {
                    return Promise.reject("Solamente números");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Stock" />
          </Form.Item>

          {/* DNI */}

          <Form.Item
            name="size"
            label={<span></span>}
            rules={[
              {
                required: true,
                message: "Dinos cuál es el talle",
              },
            ]}
          >
            <Input placeholder="Talle" />
          </Form.Item>

          <Form.Item name="image" label={<span></span>}>
            <Input placeholder="Imagen" />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              CREAR
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateProduct;
