const express = require('express');
const router = express.Router();
const User = require('../models/user');

// router.get('/', function (req, res, next) {
//     User.findOne({}, function(err, doc){
//         if(err){
//             return res.send('Error!');
//         }
//         res.render('node', {email:doc.email});
//     });
    
    
// });


// router.get('/', function (req, res, next) {
   
//     res.render('index');
// });



router.get('/', (req, res, next)=>{res.render('index')});

 

// router.get('/' , function1);

//  const function1= (req, res, next) => res.render('index');




// router.post('/' , function(req, res, next){
//     var email= req.body.email;
//     var user = new User({
//         firstName:'Ananth',
//         lastName:'Bogar',
//         password:'chandu',
//         email: email
//     });
//     user.save();
//     res.redirect('/');
// });

module.exports = router;
