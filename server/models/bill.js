const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    product:[{
        product: {type: moongoose.Types.ObjectId, ref: 'Product'},
        count: Number,
        color: String
    }],
    status:{
        type:String,
        default: 'Processing',
        enum: ['Cencelled', 'Processing', 'Successed']
    },
    paymentIntent:{    },
    orderBy:{
        type: moongoose.Types.ObjectId,
        ref: 'User',
    },
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);