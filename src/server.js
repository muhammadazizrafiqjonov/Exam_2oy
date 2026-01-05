import express from "express"
import {config} from "dotenv"
import { CarsRouters, CostumersRouters, OrdersRouters, PaymentsRouters } from "./routers/index.js"
config()

const server = express()
server.use(express.json())

server.use("/cars", CarsRouters)
server.use("/costumers", CostumersRouters)
server.use("/orders", OrdersRouters)
server.use("/payments", PaymentsRouters)


server.listen(process.env.PORT, () => console.log("Server is running on port:", process.env.PORT))


