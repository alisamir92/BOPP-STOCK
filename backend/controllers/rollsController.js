const Roll = require("./../models/rollModel");

const AppError = require("./../utils/AppError")


module.exports.getAllRolls = async (req, res, next) =>{
    try {
        const rolls = await Roll.find()
    
        res.status(200).json({
            status: 'success',
            data:{
                rolls
            }
        })
    } catch (err) {
        next(new AppError(404, "something is wrong"))
    }
};

module.exports.getRoll = async (req, res,next) => {
try {
    const roll =await Roll.find({ROLL_NO: req.params.rollNumber})
        
        if(roll==false){
            console.log(roll)
           throw new AppError(404, "No Roll found")
        }
        res.status(200).json({
            status: 'success',
            data:{
                roll
            }
        });
    } catch (err) {
    next(err)
    
}};

module.exports.addRoll = async (req, res, next) => {
        
        const roll = new Roll(req.body)
        
        roll.validate()
        .then(() => {
          console.log('Validation passed.')
      
          roll.save()
            .then(() => console.log('Roll saved.'))
            .catch(() => console.log('Roll not saved.'))
        })
        .then(()=>{
            res.status(201).json({
                status: 'success',
                data: {
                roll
                }
            });
        })
        .catch((err) => {
                    // next(new AppError(400, "errooooor"))
                    res.status(400).json({
                        status: "fail",
                        message: err.message
                    })
                }
        )
        
    }
        

module.exports.deleteRoll = async (req, res, next) => {
    try {
        const roll = await Roll.deleteOne({ ROLL_NO: req.params.rollNumber });
        
        if(roll.n ===0){
            throw new AppError(404, "No order found")}

        res.status(204).json({
            status: "success",
            message : "order has deleted"
        });
        
    } catch (err) {
        next(err)
    }
    
}


