let mongoose = require('mongoose');

let Sale = mongoose.model('Sale', {
   
    transactionDate: {
       type: Date,
        required: false, 
        minlength: 1,
        trim: true
    },
    settlementDate: {
      type: Date,  
        required: false
    },
    counterParty: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
},
    typeOfCommodity: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    exchangeLocation: {
       type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    
    volume: {
        type: Number,
        required: false,
        minlength: 1,
        trim: true
    },
   price: {
        type: Number,
       required: false,
        minlength: 1,
        trim: true
},
    completedAt: {
        type: Number,
        default: null
    }
    
});

module.exports = {Sale};
