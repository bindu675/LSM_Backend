module.exports=(app)=>{
// const todoList = require('../Controller/Controller');
const todoList1 = require('../Controller/UserController');
const todoList2 = require('../Controller/AdminController');
const todoList3 = require('../Controller/LeaveController');
const isAuth=require('../Middleware/isAuth')

    
    app.route('/user_add')
    .post(todoList1.usersignup)

    app.route('/user_login')
    .post(todoList1.userSignin,isAuth);

    app.route('/admin_add')
    .post(todoList2.addAdmin)
    
    app.route('/admin_login')
    .post(todoList2.AdminSignin,isAuth);

   
     // leave
    app.route('/Leave')
    .post(todoList3.Leave)
    .get(todoList3.list_all_tasks);

    app.route('/Leave/:LeaveId')
    .get(todoList3.Leave)
    .put(todoList3.Leave);
};  
     