import express from "express"
import OrdersController from "../controllers/orders.js"

const router = express.Router()


router
    .get("/all", OrdersController.get)
    .post("/create", OrdersController.post)
    .put("/update/:id", OrdersController.put)
    .delete("/delete/:id", OrdersController.Delete)



export default router