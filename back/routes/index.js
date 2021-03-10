
const express = require("express");
const router = express.Router();

const RegisterRoutes = require('./registerRoutes')
const LoginRoutes = require('./loginRoutes')
const Me = require("./me")
const Product = require("./Product")
const Cart = require("./Cart")
const Users = require("./user")


router.use('/register', RegisterRoutes)
router.use('/login', LoginRoutes)
router.use('/me', Me)
router.use("/product", Product)
router.use("/cart", Cart)
router.use("/users", Users)

module.exports = router;

