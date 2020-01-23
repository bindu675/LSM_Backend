module.exports=(app)=>{
// const todoList = require('../Controller/Controller');
const todoList1 = require('../Controller/UserController');
const todoList2 = require('../Controller/AdminController');
const todoList3 = require('../Controller/LeaveController');
const todoList4 = require('../Controller/FeedController');
const todoList5 = require('../Controller/DesktopController');
// const todoList6 = require('../Controller/EmailController');
const isAuth=require('../Middleware/isAuth')

    
    app.route('/user_add')
    .post(todoList1.usersignup)

    app.route('/user_login')
    .post(todoList1.userSignin,isAuth);

    app.route('/admin_add')
    .post(todoList2.addAdmin)
    
    app.route('/admin_login')
    .post(todoList2.AdminSignin,isAuth);

    //Feed
    app.route('/Feed')
    .post(todoList4.post)
    .get(todoList4.list_all_tasks);


    //Desktopmodel
    app.route('/Desktop')
    .post(todoList5.post)
    .get(todoList5.list_all_tasks);

    app.route('/Desktop/:id')
    .put(todoList5.update_a_task )
    .delete(todoList5.delete_a_task);
   
     // leave
    app.route('/Leave')
    .post(todoList3.applyLeave)
    .get(todoList3.list_all_tasks);

    app.route('/Leave/:id')
    .put(todoList3.update_a_task );

   
};  
     