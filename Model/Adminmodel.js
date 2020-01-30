var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdminSchema = new Schema({

    EmployeeNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Admin', AdminSchema);