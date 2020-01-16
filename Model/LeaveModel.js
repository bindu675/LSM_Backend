var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({

    employeeName:{
        type:String,
        required:true
    },
    empid:{
        type:String,
        required:true
    },
    Reason: {
        type: String,
        required: true
    },
    No_of_days: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        default:""
    },
    // type:{
    //     type:String,
    //     required:true
    // },
    Rleave:{
        type:String,
        default:6
    }
});

module.exports = mongoose.model('Leave', LeaveSchema);