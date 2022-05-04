
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
const userController = require('../Controllers/user');
const {engine} = require('express-handlebars');
const passport = require('../Authentication/googleLogin');
const userModel = require('../Models/user');
const JWTService = require('../CommonLib/JWTtoken');
const encryptDecrypt = require('../CommonLib/encryption-decryption')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');




app.post('/user', userController.createUser);
app.get('/user',userController.getAllUser);
app.get('/user/:userId',userController.getUserById);
app.put('/user/:userId', userController.updateUser);
app.delete('/user/:userId', userController.deleteUser);


app.get("/failed", (req, res) => {
    res.send("some error occured")
});

app.get("/success", (req, res) => {
    console.log(req.user);
    res.send("login succesfully")
});

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

    app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    async function (req, res) {
        // console.log(req.user)

        //check if user exist in our system
        //if user exist, genearate token send back to frontend.
        //else register user ,generate token and then send to frontend.
       
        let email = req.user.email;
        //check for email
        const userDetail = await userModel.findOne({ email });
        if(userDetail){
            //create token and send to frontend
            console.log("hi there",userDetail);
          
            let obj = {
                firstName: userDetail.firstName,
                lastName: userDetail.lastName,
                age: userDetail.age,
                phoneNo: userDetail.phoneNo,
                email: userDetail.email,
                gender: userDetail.gender
    
            }



            let JWTtoken = JWTService.generateToken(obj);
            res.status(200).json(
                {
                  message: "succesfull login",
                  token:JWTtoken

                })
        }else{
             let lastUser = await userModel.find({}).sort({ id : -1}).limit(1);
             let encrptedPassword = encryptDecrypt.encryptPassword("kajjajbhjvqnjq@123$$$$");
              let userDetailObj ={
                 firstName : req.user.given_name,
                 lastName : req.user.family_name,
                 age:-1,
                 phoneNo:-1,
                 email,
                 gender:"NA",
                 password:encrptedPassword,
                 id:lastUser[0].id + 1
              }
              let response = await userModel.insertMany([userDetailObj]);
              delete userDetailObj.password;
              let JWTtoken = JWTService.generateToken(userDetailObj);
              res.status(200).json(
                {
                  message: "Registartion Succesfull",
                  token:JWTtoken

                })
        }
        // res.redirect('/success')

    }
);

module.exports = app;