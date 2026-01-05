import express from "express"
import CarsController from "../controllers/cars.js"

const router = express.Router()


router
    .get("/all", CarsController.get)
    .post("/create", CarsController.post)
    .put("/update/:id", CarsController.put)
    .delete("/delete/:id", CarsController.Delete)



export default router