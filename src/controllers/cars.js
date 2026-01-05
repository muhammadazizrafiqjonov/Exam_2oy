import pool from "../db/config.js"

const get = async(req, res) => {
    const cars = await pool.query("select * from cars")

    res.status(200).json({
        status:200,
        data:cars.rows
    })
}

const post = async(req, res) => {

    const { model, colour, price, year} = req.body

    if (!model){
        return res.send("Mashina rusumini kiriting")
    }
    else if(!colour){
        return res.send("Mashina rangini kiriting")
    }
    else if(!price){
        return res.send("Mashina narxini kiriting")
    }
    else if(!year){
        return res.send("Mashina qachon ishlab chiqarilganligini kiriting")
    }


    await pool.query("insert into cars(model, colour, price, year) values($1,$2,$3,$4)", [model,colour,price,year])

    res.status(201).json({
        status:201,
        massage:"Car successfully created"
    })
}

const put = async(req,res) => {

    const {id} = req.params
    const {model, colour, price, year} = req.body

    const ID = await pool.query("select id from cars where id = $1", [id])

    if(!(ID.rows.length)){
        return res.send("Bunday idga ega mashina mavjud emas")
    }

    if(model) {
        await pool.query("update cars set model = $1 where id = $2", [model, id])
    }
    if(colour) {
        await pool.query("update cars set colour = $1 where id = $2", [colour, id])
    }
    if(price) {
        await pool.query("update cars set price = $1 where id = $2", [price, id])
    }
    if(year) {
        await pool.query("update cars set year = $1 where id = $2", [year, id])
    }


    res.status(200).json({
        status:200,
        message:"Car successfully updated"
    })

}

const Delete = async(req,res) => {

    const {id} = req.params
    const ID = await pool.query("select id from cars where id = $1", [id])

    if(!(ID.rows.length)){
        return res.send("Bunday idga ega mashina mavjud emas")
    }

    await pool.query("delete from cars where id = $1", [id])

    res.status(200).json({
        status:200,
        message:"Car successfully deleted"
    })




}
export default {
    get,
    post,
    put,
    Delete
}