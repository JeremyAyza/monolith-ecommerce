const express = require("express");
const path = require("path");
const dataController = require("../controllers/data");
const router = express.Router();

// ENRUTADOR SOLO PARA DATOS (JSON)
router.get("/user", dataController.getAllUsers);
router.get("/user/:id", dataController.getUserById);
router.post("/user", dataController.createUser);
router.put("/user/:id", dataController.updateUser);
router.delete("/user/:id", dataController.deleteUser);

router.get("/order", dataController.getOrders);
router.get("/order/:id", dataController.getOrderById);
router.post("/order", dataController.createOrder);
router.put("/order/:id", dataController.updateOrder);
router.delete("/order/:id", dataController.deleteOrder);



module.exports = router;
