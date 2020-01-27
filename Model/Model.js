var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
Firstname: {
    type: String,
    required: true
},
Username:{
    type: String,
    required:true
},
EmployeeNo:{
    type: String,
    required:true
},
password:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
Mobnum:{
    type: Number,
    required: true
},
leave:{
    type:Number,
    default:06,
    
},
});

module.exports = mongoose.model('user', TaskSchema);