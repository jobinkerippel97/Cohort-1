const { Order } = require("../model/orderModel")
const { User } = require("../model/userModel");

const createOrder = async (req,res,next) => {
    try {
        const{ userId } = req.user.id

        const{carts,paymentStatus,orderStatus} = req.body
     
        if( !carts ){
           return res.status(400).json({success: false, message: "All fields is required"}) }

            const orderExist = await Order.findOne( userId )
            if(!orderExist){

                return res.status(400).json({success: false, message: "order is not exist"})
            }
            
            const newOrder = new Order({carts,paymentStatus,orderStatus});

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
       const order = await Order.findById( {_id: orderId} ).populate('carts').exec()
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

const getAllOrders = async (req,res,next) => {
    
    try {
        
     const allOrders = await Order.find(req.query).populate('carts').exec()
     console.log(allOrders, '====allOrders')

if(allOrders.length === 0)
    return res.status(400).json({success: false, message: "No Orders found"})
     if(!allOrders){
        return res.status(400).json({success: false, message: "Orders is not fetched Successfully"})
     }
     res.json({success: true, message: "Orders fetched successfuly", data: allOrders})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}

const deleteOrder = async (req,res,next) => {
    
    try {
       const {orderId} = req.params;
       const {user} = req.user.id
       
       const userExist = await User.findOne(user)
       if(!userExist){
        return res.status(401).json({message: "User not authorized"})
       }

       const deletedOrder = await Order.findOneAndDelete({_id: orderId})
       if(!deletedOrder){
        res.json({success: false, message: "Order already deleted"})
       }

       res.json({success: true, message: "Order deleted successfully", data: deletedOrder})
        
    } catch (error) {
        console.log(error)
       next(error);
    }
}
module.exports = {createOrder, getOrder,getAllOrders,deleteOrder}