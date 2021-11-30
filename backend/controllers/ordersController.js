const Roll = require("./../models/rollModel");

const AppError = require("./../utils/AppError")

module.exports.getAllOrders = async (req, res, next) =>{
    try {
        const orders = await Roll.aggregate([
            {$group:
             {
               _id: "$ORDER_NUMBER",
               rolls: { $push:  { 
                   customerName: "$CUSTOMER_NAME",
                   filmType: "$FILM_TYPE",
                   description: "$DESCRIPTION",
                   width: "$WIDTH",
                   rollNumber: "$ROLL_NO",
                   netWeight: "$NET_WT",
                   length: "$ACTUAL_LENGTH",
                   type: "$type",
                   rollLocation: "$ROLL LOCATION",
                   manufacturingDate: "$MANUFACTURING_DATE",
                   month: "$MONTH",
                   year: "$YEAR",
                   shipDate: "$Schedule_Ship_Date"
                } }
             }
            }])
    
        res.status(200).json({
            status: 'success',
            data:{
                orders
            }
        })
    } catch (err) {
        next(new AppError(404, "something is wrong"))
    }
};


module.exports.getOrder = async (req, res,next) => {
    try {

        const order =await Roll.find({ORDER_NUMBER: req.params.orderNumber})
        // console.log(order)
        if(order==false){
            throw new AppError(404, "No order found");
        }
        res.status(200).json({
            status: 'success',
            data:{
                order
            }
        });
    } catch (err) {
        next(new AppError(404, "No order found"))
    }
}


module.exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Roll.deleteMany({ ORDER_NUMBER: req.params.orderNumber });
        
        // if(!order){
        //     return next(new AppError(404, "No order found"))}

        res.status(200).json({
            status: "success",
            message : "order has deleted"
        });
        
    } catch (err) {
        next(new AppError(404, "No order found"))
    }
    
}