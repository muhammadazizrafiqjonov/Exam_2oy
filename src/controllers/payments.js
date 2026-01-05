import pool from "../db/config.js"

const get = async(req, res) => {
    const cars = await pool.query("select * from payments")

    res.status(200).json({
        status:200,
        data:cars.rows
    })
}

const post = async(req, res) => {

    const { order_id, price, created_at} = req.body

    if (!order_id){
        return res.send("Order id ni kiriting")
    }
    else if(!price){
        return res.send("price ni kiriting")
    }
    else if(!created_at){
        return res.send("created_at ni  kiriting")
    }


    const ID = await pool.query("select id from orders where id = $1", [order_id])


    if(!(ID.rows.length)){
        return res.send("Bunday idga ega order mavjud emas")
    }

    let PAID_PRICE = await pool.query("select paid_price from orders where id = $1", [order_id])
    console.log(PAID_PRICE)
    PAID_PRICE = (PAID_PRICE.rows)[0].paid_price + price

    await pool.query("update orders set paid_price = $1 where id = $2", [PAID_PRICE, order_id] )

    let REST_PRICE = await pool.query("select rest_price from orders where id = $1", [order_id])
    REST_PRICE = (REST_PRICE.rows)[0].rest_price - price

    await pool.query("update orders set rest_price = $1 where id = $2", [REST_PRICE, order_id] )

    await pool.query("insert into payments(order_id, price, created_at) values($1,$2,$3)", [order_id,price,created_at])

    res.status(201).json({
        status:201,
        massage:"Payment successfully created"
    })
}

export default {
    get,
    post,
}