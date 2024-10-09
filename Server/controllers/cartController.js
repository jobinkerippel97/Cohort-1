const { Cart } = require("../model/cartModel");
const { Fooditem } = require("../model/foodItemModel")

const addtoCart = async (req,res,next)=> {
    try {
        
        const {userId} = req.user
        const{ fooditemId} = req.body

        const fooditem = await Fooditem.findById({_id: fooditemId});
        if(!fooditem){
            return res.status(404).json({message: "Fooditem not found"})
        }

        // find the users cart or create a new one if its dosent exist
        const cart = await Cart.findOne({_id: userId})
        if(!cart){
            cart = new Cart({userId, fooditems: []})
        }

        const fooditemExists = cart.Fooditems.some((item) => item.fooditemId.equals(fooditemId));
if(fooditemExists){
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