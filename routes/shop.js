const express = require("express");

const shopController = require("../controllers/shop");
const { Auth} = require("../controllers/authenticate");
const router = express.Router();

//LOGIN
router.get("/login",Auth, shopController.getLogin);
router.post("/login", shopController.loginUser);
router.post("/logout",  shopController.logout);

//REGISTRAR
router.get("/register", shopController.getRegister);
router.post("/register", shopController.postUser);


//PRODUCTOS
router.get("/", shopController.getProducts); //INDEX
router.get("/products/:productId", shopController.getProduct);

//CARRITOS
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/cart-update-item/', shopController.updateCart);

//ORDENES
router.get("/orders", Auth, shopController.getOrders);
router.post("/orders/generate",Auth, shopController.postOrder);

module.exports = router;