const { Order } = require("../model/orderModel")
const { Seller } = require("../model/sellerModel")

const createOrder = async (req,res,next) => {
    try {
        const user = req.user.id

        const{userId,fooditems,carts,paymentStatus,orderStatus} = req.body
     
        if( !userId || !fooditems || !carts ){
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const orderExist = await Order.findOne({userId})
            if(orderExist){

               return res.status(400).json({success: false, message: "order is already exist"})
            }
            const sellerExist = await Seller.findOne({_id: user})

            if(!sellerExist){
             return res.status(401).json({message: "seller not authorized"})
            }
            
            const newOrder = new Order({userId,fooditems,carts,paymentStatus,orderStatus});

        await newOrder.save();
        res.json({success: true, message: "Order created successfully!",  data: newOrder})

    } catch (error) {
        console.log(error)
        next(error);
    }
}
const getOrder = async (req,res,next) => {
    try {
const {orderId} = req.params
       const order = await Order.findById({_id: orderId}).populate('carts').populate('userId').populate('fooditems').exec()
       console.log(order, "====Order")

       if(!order){
        return res.status(400).json({success: false, message: "order is not fetched properly"})
       }
       res.json({success: true, message: "Order fetch successfully", data: order})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
module.exports = {createOrder, getOrder}