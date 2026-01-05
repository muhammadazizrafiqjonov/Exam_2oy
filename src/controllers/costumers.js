import pool from "../db/config.js"

const get = async(req, res) => {
    const cars = await pool.query("select * from costumers")

    res.status(200).json({
        status:200,
        data:cars.rows
    })
}

const post = async(req, res) => {

    const { fullname, age, gender, phone, address} = req.body

    if (!fullname){
        return res.send("Costumer ismi va familyasini kiriting")
    }
    else if(!age){
        return res.send("Costumer yoshini kiriting")
    }
    else if(!gender){
        return res.send("Costumer jinsini kiriting")
    }
    else if(!phone){
        return res.send("Costumer telefon raqamini kiriting")
    }
    else if(!address){
        return res.send("Costumer maanzilini kiriting")
    }


    await pool.query("insert into costumers(fullname, age, gender, phone, address) values($1,$2,$3,$4,$5)", [fullname,age,gender,phone, address])

    res.status(201).json({
        status:201,
        massage:"Costumer successfully created"
    })
}

const put = async(req,res) => {

    const {id} = req.params
    const { fullname, age, gender, phone, address} = req.body

    const ID = await pool.query("select id from costumers where id = $1", [id])

    if(!(ID.rows.length)){
        return res.send("Bunday idga ega costumer mavjud emas")
    }

    if(fullname) {
        await pool.query("update costumers set fullname = $1 where id = $2", [fullname, id])
    }
    if(age) {
        await pool.query("update costumers set age = $1 where id = $2", [age, id])
    }
    if(gender) {
        await pool.query("update costumers set gender = $1 where id = $2", [gender, id])
    }
    if(phone) {
        await pool.query("update costumers set phone = $1 where id = $2", [phone, id])
    }
    if(address) {
        await pool.query("update costumers set address = $1 where id = $2", [address, id])
    }



    res.status(200).json({
        status:200,
        message:"Costumers successfully updated"
    })

}

const Delete = async(req,res) => {

    const {id} = req.params
    const ID = await pool.query("select id from costumers where id = $1", [id])

    if(!(ID.rows.length)){
        return res.send("Bunday idga ega costumer mavjud emas")
    }

    await pool.query("delete from costumers where id = $1", [id])

    res.status(200).json({
        status:200,
        message:"costumer successfully deleted"
    })




}
export default {
    get,
    post,
    put,
    Delete
}