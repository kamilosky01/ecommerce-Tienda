import React from "react";
import "./App.css";
import "./login/components/Login.css";
import Login from "./login/pages/Login";
import Header from "./shared/Header";
import GestionarProducto from "./gestion producto/pages/GestionarProducto";
import Presentacion from "./gestion producto/pages/Presentacion";
import GestionarUsuario from "./gestion usuarios/pages/GestionarUsuario";
import GestionarVenta from "./gestion venta/pages/GestionarVenta";
import Home from "./home/pages/Home";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

function App () {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");

    if (isLogged === null) {
      localStorage.setItem("isLogged", false);
      setLogged(false);
    } else {
      setLogged(isLogged === "true");
    }
  }, []);

  return (
    <Router>
      <Header isLoggedIn={logged} login={setLogged} />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/Login" exact>
          <Home isLoggedIn={logged} />
        </Route>
        <Route path="/GestionarProducto" exact>
          <GestionarProducto />
        </Route>
        <Route path="/GestionarVenta" exact>
          <GestionarVenta />
        </Route>
        <Route path="/GestionarUsuario" exact>
          <GestionarUsuario />
        </Route>
        <Route path="/Presentacion" exact>
          <Presentacion />
        </Route>
        <Redirect to="/Login" />
      </Switch>
    </Router>
  );
};

export default App;
