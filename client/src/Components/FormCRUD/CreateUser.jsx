import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./CreateUser.css";
import { createUser, getUsers } from "../../redux/actions";
import { useHistory } from "react-router-dom";

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

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const usuarios = useSelector((state) => state.users)

  const dispatch = useDispatch();
  const [valor, setValor] = useState([]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values.email);
    dispatch(createUser(values));
  };
  
  const history = useHistory();
    usuarios&&usuarios.map(datos => {
      if(datos.email === valor.email && datos.DNI === valor.DNI) {
        history.push("/users/userok")
      }
    } )
  // console.log(usuarios)
  // console.log(valor)

      useEffect(() => {
        dispatch(getUsers())
      }, []);

  return (
    <>
      <h3>Unete a Sports Store</h3>
      <div className="col-4 col-sm-1 col-md-2 col-lg-2 form-group containerUser">
        <Form
          className="allInputs"
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={(values) => {
            setValor(values)
            onFinish(values);
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={
              <span>
                <Tooltip title="¿Cómo quieres que otros te llamen?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Por favor dinos tu Nombre",
                whitespace: true,
              },
            ]}
          >
            <Input
              className="inputSize"
              placeholder="Nombre"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={<span>&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Por favor dinos tu apellido",
                whitespace: true,
              },
            ]}
          >
            <Input
              className="inputSize"
              placeholder="Apellido"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={<label></label>}
            rules={[
              {
                type: "email",
                message: "El E-mail no es válido",
              },
              {
                required: true,
                message: "Por favor introduzca un E-mail!",
              },
            ]}
          >
            <Input
              className="inputSize"
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            name="DNI"
            label={<label></label>}
            rules={[
              {
                type: "",
              },
              {
                required: true,
                message: "Ingrese su DNI. Sólo números",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!/^(?=.*\d)[0-9]{8,10}$/.test(value)) {
                    return Promise.reject(
                      "Únicamente números. Máximo 10 caracteres"
                    );
                  }
                  // if(!/[a-zA-Z\d]+/.test(input.password))
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              className="inputSize"
              placeholder="DNI"

              // value={input.DNI}
              // onChange={(e) => setInput({ ...input, DNI: e.target.value })}
            />
          </Form.Item>
          {/* PASSWORD */}
          <Form.Item
            name="password"
            label={<label></label>}
            rules={[
              {
                type: "regexp",
                pattern: new RegExp(/[a-zA-Z\d]+/),
                message: "Ingresa tu contraseña",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  // /[a-zA-Z\d]+/.test(value)
                  if (
                    !/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{5,20}$/.test(value)
                  ) {
                    // /^\w+$/
                    // ((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})
                    return Promise.reject("Sólo números y letras. Mínimo 5 caracteres");
                  }
                  // if(!/[a-zA-Z\d]+/.test(input.password))
                  return Promise.resolve();
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              className="inputSize"
              placeholder="Constraseña"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<label></label>}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Confirma tu contraseña",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject("Las dos contraseñas no concuerdan");
                },
              }),
            ]}
          >
            <Input.Password
              className="inputSize"
              placeholder="Confirmar Constraseña"
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button className="ant-btn-primaryG" type="primary" htmlType="submit">
              Registrate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default RegistrationForm;
