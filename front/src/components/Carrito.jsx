//- Carrito: (header con usuario del pedido, lista de items, boton de confirmacion, boton hacer pedido)
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarrito, updateCarrito } from "../store/carrito";
// import StarRateIcon from "@material-ui/icons/StarRate";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { deleteItemFromCarrito, modifyItem } from "../store/items";
import productStyles from "../Styles/products";

const StyledTableCell = withStyles(() => ({
  head: {
    color: "white",
    background: "#A41313	",
    textAlign: "center",
  },
  body: {
    fontSize: 14,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}))(TableCell);

const Cart = () => {
  const dispatch = useDispatch();
  const classes = productStyles();
  const carrito = useSelector((state) => state.carrito);
  const items = useSelector((state) => state.items);
  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    if (user) dispatch(getCarrito(user.id));
  }, [items]);

  // HANDLERS -----------------
  const handleDelete = (item) => {
    const ids = { productId: item.id, cartId: carrito.id };
    // console.log("ids", ids)
    return dispatch(deleteItemFromCarrito(ids));
  };

  const handleItem = (item, operation) => {
    const itemData = {
      cartId: carrito.id,
      productId: item.id,
      operation,
    };
    return dispatch(modifyItem(itemData));
  };


  const precio = [];
  const comida = [];
  let total;
  if (carrito.items) {
    carrito.items.map((item) => {
      precio.push(item.item.qty >= 1 ? item.price * item.item.qty : 0);
      comida.push(item.name);
    });
    total = precio.reduce((a, b) => a + b, 0);
  }
  
  // Esta logica Pasa al componente "compra.jsx" ------------------------
  // const handlePayCarrito = () => {
  //   const cart = {
    //     state: "COMPLETED",
  //     id: carrito.id,
  //     total,
  //   };
  //   dispatch(updateCarrito(cart)) //Cambia el estado del carrito actual a COMPLETED
  //     .then(() => dispatch(getCarrito(user.id))); // Inmediatamente después genera un nuevo carrito.
  // };

  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {carrito.items
              ? carrito.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={""}
                        width="128"
                        height="128"
                        margin="auto"
                        display="block"
                        maxWidth="100%"
                        maxHeight="100%"
                        className={classes.image}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h5" align="left">
                        {item.name}
                      </Typography>
                      <Typography variant="h6" align="left">
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" align="center">
                        {item.price + "$"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {"Cantidad: " + item.item.qty}
                    </TableCell>{" "}
                    <br />
                    <TableCell align="center">
                      <Typography>
                        <Button
                          variant="contained"
                          size="small"
                          color="#FF6633"
                          onClick={() => {
                            const suma = "suma";
                            return handleItem(item, suma);
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </Typography>{" "}
                      <br />
                      <Typography>
                        <Button
                          variant="contained"
                          size="small"
                          color="#FF6633"
                          onClick={() => {
                            const resta = "resta";
                            return handleItem(item, resta);
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                      </Typography>{" "}
                      <br />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="#FF6633"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Precio Total</StyledTableCell>
              <StyledTableCell>Productos</StyledTableCell>
              <StyledTableCell>Ir a pagar</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                {precio.map((prc) => (
                  <Typography align="center">
                    <Typography>{prc + "$"}</Typography>
                  </Typography>
                ))}
              </TableCell>
              <TableCell>
                {comida.map((comida) => (
                  <Typography align="center">
                    <Typography>{comida}</Typography>
                  </Typography>
                ))}
              </TableCell>

              <TableCell align="center">
                {total + "$       "}
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/compra"
                >
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Pagar
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Cart;
