import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { LockOutlined } from "@material-ui/icons";
import { compose } from "recompose";

import { consumerFirebase } from "../server";

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    backgroundColor: "red",
  },
  form: {
    width: "100%",
    marginTop: 8,
  },
};
const Login = ({ firebase, history }) => {
  const [state, setState] = useState({
    firebase: null,
    email: "",
    password: "",
    phone: "",
    codigoConfirmacion: "",
    codePhone: "",
  });

  useEffect(() => {
    setState({ ...state, firebase });
  }, []);
  if (state.firebase !== null) {
    // state.firebase.auth.languageCode = "es";
    window.recaptchaVerifier = new firebase.authorization.RecaptchaVerifier(
      "sign-in-button-phone",
      {
        size: "invisible",
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      }
    );
  }
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    const { firebase, email, password } = state;
    firebase.auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/prueba");
      })
      .catch((e) => {});
  };
  const verifiNumerTelephone = (e) => {
    e.preventDefault();
    const { firebase, phone } = state;
    firebase.auth
      .signInWithPhoneNumber("+52" + phone, window.recaptchaVerifier)
      .then((codigoEnviado) => {
        console.log(codigoEnviado);
        setState({ ...state, codigoConfirmacion: codigoEnviado });
      })
      .catch((e) => {
        console.log("Error al generar el codigo enviado:", e);
      });
  };
  const loginConTelefono = (e) => {
    e.preventDefault();
    const { firebase, codigoConfirmacion, codePhone } = state;
    let credential = firebase.authorization.PhoneAuthProvider.credential(
      codigoConfirmacion.verificationId,
      codePhone
    );
    firebase.auth.signInAndRetrieveDataWithCredential(credential).then((authUser) => {
      console.log(authUser);
    });
  };
  return (
    <>
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingrese Usuario
          </Typography>
          <form style={style.form}>
            <TextField
              variant="outlined"
              label="E-Mail"
              name="email"
              fullWidth
              margin="normal"
              onChange={onChange}
              value={state.email}
            />
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={onChange}
              value={state.password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              margin="normal"
              type="submit"
              onClick={login}
            >
              Enviar
            </Button>
          </form>
        </div>
      </Container>
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingrese Telefono
          </Typography>
          <form style={style.form}>
            <TextField
              variant="outlined"
              label="Phone"
              name="phone"
              fullWidth
              margin="normal"
              onChange={onChange}
              value={state.phone}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              margin="normal"
              type="submit"
              id="sign-in-button-phone"
              onClick={verifiNumerTelephone}
            >
              Enviar
            </Button>
          </form>
        </div>
      </Container>
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingrese Usuario
          </Typography>
          <form style={style.form}>
            <TextField
              variant="outlined"
              label="codePhone"
              name="codePhone"
              fullWidth
              margin="normal"
              onChange={onChange}
              value={state.codePhone}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              margin="normal"
              type="submit"
              onClick={loginConTelefono}
            >
              Enviar
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default withRouter(compose(consumerFirebase)(Login));
