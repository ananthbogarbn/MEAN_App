const express = require('express');
const router = express.Router();
const Message = require('../models/message')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// router.get('/', function(req , res, next){
//     Message.find()
//     .populate('user' , 'firstName')
//     .exec(function(err , messages){
//         if(err){
//             return res.status(500).json({
//                 title : 'An error occurred',
//                 error : err
//             })
//         }
//         res.status(201).json({
//             message : 'Success',
//             obj : messages
//         })
//     });
// });






router.get('/', (req , res, next)=>{
    Message.find()
    .populate('user' , 'firstName')
    .exec((err , messages)=>{
        if(err){
            return res.status(500).json({
                title : 'An error occurred',
                error : err
            })
        }
        res.status(201).json({
            message : 'Success',
            obj : messages
        })
    });
});







router.use('/' , (req,res,next)=>{
    jwt.verify(req.query.token, 'secret' , (err , decoded)=>{
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error:err
            });
        }
        next();
    });
});


router.post('/' , (req , res , next)=>{
    
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err , user)=>{
        if(err){
            return res.status(500).json({
                title: 'An Error Occurred',
                error : err
            });
        }
        var message = new Message({
            content: req.body.content, 
            user : user._id 
        });
        message.save((err , result)=>{
            if(err){
                return res.status(500).json({
                    title: 'An Error Occurred',
                    error : err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved Message!',
                obj: result
            });
        });
    })
   
});

router.patch('/:id', (req, res, next)=>{
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id , (err, message)=>{
        if (err){
            return res.status(500).json({
                title:'An error ocurred',
                error : err
            });
        }
        if(!message){
            return res.status(500).json({
                title:'No Message found',
                error: {message:'Message not found'}
            });
        }
        if(message.user !=decoded.user._id){
            return res.status(401).json({
                title:'Not Authenticated',
                error:err
            });
        }
        message.content=req.body.content;// update content
        message.save((err , result)=>{
            if(err){
                return res.status(500).json({
                    title: 'An Error Occurred',
                    error : err
                });
            }
            res.status(201).json({
                message: 'Updated Message!',
                obj: result
            });
        });

        
    });
});
router.delete('/:id' , (req, res, next)=>{
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id , (err, message)=>{
        if (err){
            return res.status(500).json({
                title:'An error ocurred',
                error : err
            });
        }
        if(!message){
            return res.status(500).json({
                title:'No Message found',
                error: {message:'Message not found'}
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title:'Not Authenticated',
                error:err
            })
        }
       
        message.remove( (err , result)=>{
            if(err){
                return res.status(500).json({
                    title: 'An Error Occurred',
                    error : err
                });
            }
            res.status(201).json({
                message: 'Deleted Message!',
                obj: result
            });
        });

        
    });
})
module.exports=router; 