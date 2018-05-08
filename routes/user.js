const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/',  (req, res, next) =>{
   
    var user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : bcrypt.hashSync(req.body.password, 10),
        email : req.body.email

    });
    user.save( (err , result)=>{
        if(err){
            return res.status(500).json({
                title:'An error occurred',
                error : err
            });
        }
        res.status(201).json({
            message: 'User Created!',
            obj: result
        });
    });  
});

router.post('/signin' , (req , res, next)=>{
    User.findOne({email:req.body.email} , (err , user)=>{
        if(err){
            return res.status(500).json({
                title:'An error occurred',
                error : err
            });
        }
        if(!user){
            return res.status(500).json({
                title : 'Login Failed',
                error : {message:'Invalid login credentials'}
            });
        }
       if (!bcrypt.compareSync(req.body.password , user.password)){
        return res.status(500).json({
            title : 'Login Failed',
            error : {message:'Invalid login credentials'}
        });
       }
    var token = jwt.sign({user: user}, 'secret' ,{expiresIn : 7200});
    res.status(200).json({
        message:'Successfully Logged In',
        token:token,
        userId:user._id
    })
    });
});

module.exports = router;