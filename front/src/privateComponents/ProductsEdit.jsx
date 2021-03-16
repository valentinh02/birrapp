import { Table, TableBody, TableCell, TableContainer, Box, TableRow, Button, Typography, Grid } from '@material-ui/core';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getProducts } from "../store/products"
import { addItemToCarrito } from "../store/items"
import productStyles from "../Styles/products"
import { getCarrito } from "../store/carrito";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import productSearchStyles from "../Styles/productSearchBar"
import Toolbar from '@material-ui/core/Toolbar';
import axios from "axios";





const TableMaterial = () => {
    const classes = productStyles()
    const classes2 = productSearchStyles()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const carrito = useSelector((state) => state.carrito);
    const user = useSelector((state) => state.user);

    const deleteProduct = (id) => {
        axios({
            method: `delete`,
            url: `http://localhost:8000/api/product/${id}`,
        })
            .then(() => dispatch(getProducts()))
    }
    // const handleItem = (item, operation) => {
    //     const itemData = {
    //       cartId: carrito.id,
    //       productId: item.id,
    //       operation
    //     }
    //     return dispatch(modifyItem(itemData));
    //   };

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <TableContainer>
            <Grid align="center">
                <Link to="/admin/products/create" style={{ textDecoration: 'none', color: "inherit" }}>
                    <Button
                        align="center"
                        variant="contained"
                        color="primary"
                    >Create New Product
                    </Button>
                </Link>


                <div className={classes2.search}>
                    <div className={classes2.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes2.inputRoot,
                            input: classes2.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Grid>

            <Table>
                <TableBody >
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell><Link to={`/admin/product/${product.id}`}
                                style={{ textDecoration: 'none', color: "inherit" }}><img src={product.pictures && product.pictures[0].url}
                                    width="128" height="128" margin='auto'
                                    display='block' maxWidth='100%' maxHeight='100%' className={classes.image}

                                /></Link>
                            </TableCell >
                            <TableCell align="center">
                                <Typography variant="h5" align="left">{product.name}</Typography>
                                <Typography varinat="h6" align="left">{product.description}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6">{product.price + "$"}</Typography>
                            </TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                                {<Link to="/admin/product/edit"
                                    style={{ textDecoration: 'none', color: "inherit" }} >
                                    <Button variant="contained"
                                        color="primary"
                                        fullWidth>
                                        Editar
                                    </Button></Link>
                                }
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => deleteProduct(product.id)}>
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableMaterial