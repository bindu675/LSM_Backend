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
        default:"pending"
    },
    // Email: {
    //     type: String,
    //     required: 'Please Enter valid emailId'
    //     },
    

    Rleave:{
        type:String,
        default:6
    }
});

module.exports = mongoose.model('Leave', LeaveSchema);




// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;


// var EmailSchema = new Schema({

// Email: {
// type: String,
// required: 'Please Enter valid emailId'
// }
// // Password: {
// // type: String,
// // required: 'Please Enter the current password'
// // }

// });

// module.exports = mongoose.model('nodemailer', EmailSchema);