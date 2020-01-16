var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeelistSchema = new Schema({

  SINO:{
    type:Number,
    required:true
  },

  EmpId:{
    type:String,
    required:true,
  },

  FirstName:{
    type:String,
    required:true,
  },
  
  LastName:{
    type:String,
    required:true,
  },

  Date_of_Birth:{
    type:Date,
    required:true,
  },

  Sex:{
    type:String,
    required:true,
  },

  JoiningDate:{
    type:Date,
    required:true,
  },

  email_id:{
    type:String,
    required:true,
  },

  MobileNo:{
    type:Number,
    required:true,
  }
  });

  module.exports = mongoose.model('employeelist', employeelistSchema);