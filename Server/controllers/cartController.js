const { Cart } = require("../model/cartModel")
const { Fooditem } = require("../model/foodItemModel")

const addToCart = async (req,res,next)=> {
    try {
        
        const {userId} = req.user.id
        const {fooditemId} = req.body

        const fooditem = await Fooditem.findById(fooditemId);
        console.log(fooditem);
        
        if(!fooditem){
            return res.status(404).json({message: "Fooditem not found"})
        }

        // find the users cart or create a new one if its dosent exist
        let cart = await Cart.findOne(userId)
        
        if(!cart){
            cart = new Cart({userId, fooditems: []})
        }
         //check the fooditem is already in the cart
        const fooditemExist = cart.fooditems.some((item) => item.fooditemId.equals(fooditemId));
if(fooditemExist){
    return res.status(400).json({message: "Fooditem already in cart"})
}

// add fooditem to the cart
cart.fooditems.push({
    fooditemId,
    price: fooditem.price,
})

// recalculate the total price
cart.calculateTotalPrice();

await cart.save()

res.status(200).json(cart)
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
        
    }
}

const removeFromCart = async(req,res,next)=> {
    try {
        const {userId} = req.user.id
        const{fooditemId} = req.body

        //find the users cart
let cart = await Cart.findOne(userId)
if(!cart){
    return res.status(400).json({message: "Cart not found"})
}
   
    //remove the fooditem from the cart
    cart.fooditems = cart.fooditems.filter((item) => !item.fooditemId.equals(fooditemId))

    // recalculate the total price
    cart.calculateTotalPrice()
    
    //save the cart
    await cart.save();
    res.status(200).json({success: true, message:" Cart removed successfully", data: cart})
    } catch (error) {
        console.log(error)
        next(error)
    }

}

const getCart = async (req,res,next)=> {
    try {
        
        const {userId} = req.user.id

        const cart = await Cart.findOne( userId ).populate('fooditems.fooditemId').sort({createdAt: -1})
        console.log(cart, "======cart");
        
        if(!cart){
            return res.status(400).json({message: "Cart not found"})
        }
        res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
}




module.exports = {addToCart, removeFromCart, getCart}