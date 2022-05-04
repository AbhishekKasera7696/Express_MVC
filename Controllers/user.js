const userModel = require('../Models/user');



async function getAllUser(req,res,next){
   try{
    //    let response = await userModel.find({}).populate('employeid',{firstName:1});
    //    res.json(response)

         res.render("home" , { name:"Abhishek", age:25})
   }
   catch (error){
      res.status(500).json(error)
   }
}

async function createUser(req,res,next){
   try{
       console.log('req.body',req.body);
       let userDetail = req.body;
       let response = await userModel.insertMany([userDetail]);
       let parentInfo = {
          email :response._id,
          firstName : req.body.parents.firstName,
          lastName : req.body.parents.lastName,
          age : req.body.parents.age,
          phoneNo : req.body.parents.phoneNo,
       }

       console.log(parentInfo)
       await parentModel.insertMany([parentInfo]);
       res.json(response);
   }
   catch (error){
      res.json(error)
   }
}

async function getUserById(req,res,next){
   let userId = req.params.userId;
   let response = await userModel.find({_id:userId});
   res.json(response)
}

async function deleteUser(req,res,next){
    let userId = req.params.userId;
    let response = await userModel.deleteOne({_id:userId});
    res.json(response)
 
}

async function updateUser(req,res,next){
    let userId = req.params.userId;
    let body = req.body;
    console.log(body,userId)
    let response = await userModel.updateOne({_id:userId}, {$set:body});
    res.json(response)
}

module.exports = {
    getAllUser,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}