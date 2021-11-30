const mongoose = require('mongoose')

const rollSchema = new mongoose.Schema({
    "CUSTOMER_NAME": {
        type: String,
          required: [true, 'A customer must have a name'],
          trim: true,
        
    },
    "ORDER_NUMBER": {
        type: Number,
        required: [true, 'A order must have a number'],
        max: [99999999, "Order Number must be 8 numbers"],
        min: [10000000, "Order Number must be 8 numbers"]
    },

    "FILM_TYPE":{  
        type: String,
        required: [true, 'A roll must have a film type'],
        validate: {
            validator: function(v) {
              return /[a-zA-Z]{3}-\d{2}/.test(v);
            },
            message: props => `${props.value} is not a valid film type!`
          }
    },
    "DESCRIPTION":{
        type: String,
    },
    "WIDTH":{
        type: Number,
        max: [2000, "width must be less than 2000 mm"],
        min: [200, "width must be greater than 200 mm"],
        required: [true, 'A roll must have a width']
    },
    "ROLL_NO":{
        type:String,
        unique: true,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z]{1,}\d{3}[a-zA-Z]{2}\d{5}$/.test(v);
            },
            message: props => `${props.value} is not a valid roll number!`
          },
        required: [true, 'A roll must have a number']
    },
    "NET_WT":{
        type: Number,
        required: [true, 'A roll must have a weight']
    },
    "ACTUAL_LENGTH":{
        type: Number,
        required: [true, 'A roll must have a length']
    },

    "type": {
        type: String,
        enum: {
            values: ['BARE', 'MET'],
            message: 'type is not found'
          }
    },

    "ROLL LOCATION": String,

    "MANUFACTURING_DATE":{
        type: Date,
        required: [true, 'A roll must have a manufacturing date']
    },

    "Month": {
        type:String,
        trim: true
    },
    "Year": {
        type: Number
    },

    "Schedule_Ship_Date": {
        type: Date,
        required: [true, 'A roll must have a ship date']
    }

}
);

const Roll = mongoose.model('Roll', rollSchema);



module.exports = Roll;