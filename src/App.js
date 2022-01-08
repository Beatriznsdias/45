import {useState} from "react";
import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";

function App() {
  const handleClickLogin = (values) =>{
    Axios.post("https://localhost:3001/login",{
      email: values.email,
      password: values.password,
    }).then((response) =>{
      console.log(response);
    });
  }
  const handleClickCadastro = (values) =>{
    Axios.post("https://localhost:3001/cadastro", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      //alert(response.data.msg);
      console.log(response);
    });
  };

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email!")
      .required("Este campo é obrigatório!"),

    password: yup
      .string()
      .min(8, "A senha deve conter 8 caracteres.")
      .required("Este campo é obrigatório!"),
  });
  const validationCadastro = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email!")
      .required("Este campo é obrigatório!"),

    password: yup
      .string()
      .min(8, "A senha deve conter 8 caracteres.")
      .required("Este campo é obrigatório!"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], " As senhas não sao iguais."),
  });
  return (
    <div className="container">
      <h1>Login</h1>
      <Formik 
      initialValues={{}} 
      onSubmit={handleClickLogin} 
      validationSchema={validationLogin}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field 
              name="email" 
              className="form-field" 
              placeHolder="Email"
            />

            <ErrorMessage 
              component="span" 
              name="email" 
              className="form-error" 
            />

          </div>

          <div className="login-form-group">
            <Field 
              name="password" 
              className="form-field" 
              placeHolder="Senha" 
            />

            <ErrorMessage 
              component="span" 
              name="password"
              className="form-error" 
            />
          </div>
          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>
      <h1>Cadastro</h1>
      <Formik
        initialValues={{}} 
        onSubmit={handleClickCadastro}
        validationSchema={validationCadastro}
      >

        <Form className="login-form">
          <div className="login-form-group">
            <Field 
              name="email" 
              className="form-field" 
              placeHolder="Email" 
            />

            <ErrorMessage 
              component="span" 
              name="email" 
              className="form-error" 
            />

          </div>
          <div className="login-form-group">
            <Field 
              name="password" 
              className="form-field" 
              placeHolder="Senha" 
            />

            <ErrorMessage 
              component="span" 
              name="password" 
              className="form-error" 
            />

          </div>

          <div className="login-form-group">
            <Field 
              name="confirmPassword" 
              className="form-field" 
              placeHolder="Confirme sua senha." />

            <ErrorMessage component="span" name="confirmPassword" className="form-error" />

          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
