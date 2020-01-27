var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({

    employeeName: {
        type: String,
        required: true
    },
    empid: {
        type: String,
        required: true
    },
    Reason: {
        type: String,
        required: true
    },
    No_of_days: {
        type: Number,
        default:null
    },
    type:{
        type: String,
        required: true
    },

    Status: {
        type: String,
        default: "pending"
    },
    Email: {
        type: String,
        required: 'Please Enter valid emailId'
    },

    balance: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Leave', LeaveSchema);
