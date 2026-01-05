import express from "express"
import CostumersController from "../controllers/costumers.js"

const router = express.Router()


router
    .get("/all", CostumersController.get)
    .post("/create", CostumersController.post)
    .put("/update/:id", CostumersController.put)
    .delete("/delete/:id", CostumersController.Delete)



export default router