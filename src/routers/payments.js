import express from "express"
import PaymentsController from "../controllers/payments.js"

const router = express.Router()


router
    .get("/all", PaymentsController.get)
    .post("/create", PaymentsController.post)


export default router