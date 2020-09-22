import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Tooltip,
  Button,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import './CreateUser.css';
import { createUser } from "../../actions/index";
import { Redirect } from "react-router";

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

  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(createUser(values));
  };

  if(redirect) {
    return <Redirect to="/users/userok"/>
  }

  // function User(e, input) {
  //   e.preventDefault();
  //   dispatch(createUser(input));
  //   Array.from(document.querySelectorAll("input")).forEach(
  //     (input) => (input.value = "")
  //   );
  // }
        // if(!/[a-zA-Z\d]+/.test(input.password)) {
        //   console.log("No sirve")
        // }

  return (
    <>
    <h3>Unete a Sports Store</h3>
    <div className="col-4 form-group containerUser">
      <Form
      //  onSubmit={(e) => User(e, input)}
      className=""
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={(values) => {
        onFinish(values)
        setTimeout(function() {
          setRedirect(true);
          
        },1000,);
      }}
      scrollToFirstError
    >
      {/* Nombre */}
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
          placeholder="Nombre"
        //  value={input.name}
        //  onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
      </Form.Item>
      {/* APELLIDO */}

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
          placeholder="Apellido"
        // value={input.lastName}
        // onChange={(e) => setInput({ ...input, lastName: e.target.value })}
        />
      </Form.Item>

      {/* EMAIL */}

      <Form.Item
        name="email"
        label= {
          <label>

          </label>
        }
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
          placeholder="E-mail"

        // value={input.email}
        // onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
      </Form.Item>

      {/* DNI */}

      <Form.Item
        name="DNI"
        label= {
          <label>

          </label>
        }
        rules={[
          {
            type:"",
          },
          {
            required: true,
            message: "Ingrese su DNI. Sólo números"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!/^(?=.*\d)[0-9]{8,10}$/.test((value))) {
                return Promise.reject("Únicamente números. Máximo 10 caracteres");
              }
              // if(!/[a-zA-Z\d]+/.test(input.password))
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input 
          placeholder="DNI"

          // value={input.DNI}
          // onChange={(e) => setInput({ ...input, DNI: e.target.value })}
        />
      </Form.Item>
                {/* PASSWORD */}
      <Form.Item
        name="password"
        label= {
          <label>

          </label>
        }
        rules={[
          {
            type: "regexp",
            pattern: new RegExp(/[a-zA-Z\d]+/),
            message: "Ingresa tu contraseña",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              // /[a-zA-Z\d]+/.test(value)
              if (!/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z0-9]{1,20}$/.test((value))) {
                // /^\w+$/
                // ((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})
                return Promise.reject("Solamente numeros y letras");
              }
              // if(!/[a-zA-Z\d]+/.test(input.password))
              return Promise.resolve();
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password 
          placeholder="Constraseña"

        // value={input.password}
        // onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label= {
          <label>

          </label>
        }
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

              return Promise.reject(
                "Las dos contraseñas no concuerdan"
              );
            },
          }),
        ]}
      >
        <Input.Password 
          placeholder="Confirmar Constraseña"
        // value={input.confirm}
        // onChange={(e) => setInput({ ...input, confirm: e.target.value })}
        />
      </Form.Item>


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Registrate
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
};

export default RegistrationForm;
