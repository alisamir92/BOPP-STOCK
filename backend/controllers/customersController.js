const Roll = require("./../models/rollModel");

const AppError = require("./../utils/AppError")


module.exports.getAllCustomers = async (req, res, next) =>{
    try {
        const customers = await Roll.aggregate([
            {$group:
             {
               _id: "$CUSTOMER_NAME",
               rolls: { $push:  { 
                   orderNumber: "$ORDER_NUMBER",
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
                customers
            }
        })
    } catch (err) {
        next(new AppError(404, "something is wrong"))
    }
};

module.exports.getCustomer = async (req, res,next) => {
    try {

        const customer =await Roll.find({CUSTOMER_NAME: req.params.customerName})
        // console.log(customer)
        if(customer==false){
            throw new AppError(404, "No order found");
        }
        res.status(200).json({
            status: 'success',
            data:{
                customer
            }
        });
    } catch (err) {
        next(new AppError(404, "No order found"))
    }
}

