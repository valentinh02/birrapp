import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../store/user"
import { getCarrito } from "../store/carrito";




const Index = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const carrito = useSelector(state => state.carrito)

  useEffect(() => {
    //preguntar si hay carrito con estado pending y si no, crearlo. con el usuario que tengo, hacer un getCart
    dispatch(getUser())
      .then((usuario) => {
        if (usuario.payload && !usuario.payload.admin) {
          // console.log("usuario", usuario) 
          if (!carrito.id) dispatch(getCarrito(usuario.payload.id))
        }
      })
  }, [])

  return (
    <div>
      <Switch>
        <Route path="/admin" render={() => <Admin />} />
        <Route path="/" render={() => <App />} />
      </Switch>
    </div>
  );
};
export default Index;
