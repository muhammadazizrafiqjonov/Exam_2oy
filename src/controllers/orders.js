import pool from "../db/config.js"

const get = async(req, res) => {
    const cars = await pool.query("select * from orders INNER JOIN cars on orders.car_id = cars.id INNER JOIN costumers on orders.costumer_id=costumers.id")

    res.status(200).json({
        status:200,
        data:cars.rows
    })
}

const post = async(req, res) => {

    const { costumer_id, 
            car_id, 
            month_count, 
            start_date,
            end_date, 
            payment_date, 
            start_price,    
        } = req.body

    if (!costumer_id){
        return res.send("Costumer id sini kiriting")
    }
    else if(!car_id){
        return res.send("car id sini kiriting")
    }
    else if(!month_count){
        return res.send("Month_count ni kiriting")
    }
    else if(!start_date){
        return res.send("Start_date ni kiriting")
    }
    else if(!end_date){
        return res.send("end_date ni kiriting")
    }
    else if(!payment_date){
        return res.send("Payment_date ni kiriting")
    }
    else if(!start_price){
        return res.send("Start_price ni kiriting")
    }

    const COSTUMER_id = await pool.query("select id from costumers where id = $1", [costumer_id])

    if(!(COSTUMER_id.rows.length)){
        return res.send("Bunday idga ega costumer mavjud emas")
    }
    
    const Car_id = await pool.query("select id from cars where id = $1", [car_id])

    if(!(Car_id.rows.length)){
        return res.send("Bunday idga ega car mavjud emas")
    }


    let max_price
    let price = await pool.query("select price from cars where id = $1", [car_id])
    price = (price.rows)[0].price
    console.log(price)
    if(start_price != price*0.2){
        return res.send("Bunday boshlang'ich mablag' bilan bo'lib tolashga olib bolmadi")
    }

    if(month_count == 1){
        max_price = price * 1.15
    }
    else if(month_count == 3){
        max_price = price * 1.3
    }
    else if(month_count ==  5){
        max_price = price * 1.55
    }
    else {
        return res.send("Bunday muddatga bo'lib to'lashga olib bolmaydi")
    }
    let paid_price = 0
    let rest_price = max_price - start_price 

    await pool.query("insert into orders(costumer_id, car_id, month_count, start_date, end_date, payment_date, start_price, max_price, paid_price, rest_price) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [costumer_id, car_id, month_count, start_date, end_date, payment_date, start_price, max_price, paid_price, rest_price])

    res.status(201).json({
        status:201,
        massage:"Order successfully created"
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
        message:"Orders successfully updated"
    })


}

const Delete = async(req,res) => {

    const {id} = req.params
    const ID = await pool.query("select id from orders where id = $1", [id])

    if(!(ID.rows.length)){
        return res.send("Bunday idga ega order mavjud emas")
    }

    await pool.query("delete from orders where id = $1", [id])

    res.status(200).json({
        status:200,
        message:"order successfully deleted"
    })




}
export default {
    get,
    post,
    put,
    Delete
}


//  "costumer_id":1,
//     "car_id":2,
//     "month_count":1,
//     "start_date":"2025-06-12",
//     "end_date":"2025-07-12",
//     "payment_date":25,
//     "start_price":10000
