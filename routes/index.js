const express = require('express');
const router = express.Router();
const database = require('../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
var cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const { User } = database;
//Render Signup

function generateToken(id, email) {
  const token = jwt.sign(
    {
      userId: id, email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '7d',
    },
  );
  return token;
}
router.get('/error', async (req, res)=>{
  console.log('n')
  res.render('error');
});
router.get('/register', async (req, res)=>{
  console.log('l')
  res.render('register');
});

router.get('/dashboard', async (req, res)=>{
  console.log('l')
  res.render('dashboard');
});

router.post('/register', async (req, res)=>{
  console.log('pp');  const {
     email,
    } = req.body;
  try {
    
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: req.body,
    });
    
    if (created) {
      console.log('new');
     var token = generateToken(user.email);
     res.cookie("token", token); 
      return res.status(201).json({
        status: 'success',
        userId: email,
        token: token,
      });
    }
     return res.status(409).json({
      status: 'error',
      message: 'User already exist',
    });
    
  //return res.render('error');
 
  } catch (error) {
    console.log(error, 'p')
    return res.status(500).json({
      status: 'error',
      message: 'An error has occured',
    });
    
  }

});

router.post('/auth/login', async (req, res)=>{
  console.log('dd');  
  const {
     idType,
    passType
    } = req.body;
  try {
    const user = await User.findOne({
      where: {email: idType}
    });
    console.log(user)
    if(!user){
      res.render('error');
      return res.status(401).json({
        status: 'failed',
        message: 'User does not exist',
      });
    }
    if (user.comparePassword(passType, user)) {
      var persistEmail = user.email
      req.user = { persistEmail };
      const tokennp = generateToken(user.id, user.email);
      const data = { user, tokennp };
      var tokemmn = generateToken(user.email);
      res.cookie("token", tokemmn); 
      return res.status(200).json({
        status: 'success',
        message: 'success',
        data:  data,
      });
    } 
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid credentials',
    });
 
  } catch (error) {
    console.log(error, 'p')
    return res.status(401).json({
      status: 'failed',
    });
  }

});

router.get('/login/success', async (req, res)=>{
  console.log('dd');  
  const {
     token
    } = req.query;
  try {
    var rou = 'http://localhost:5000/api/centralauth/CASUsers/confirmUser?token='+token;
    var route = rou.replace(/\s/g, "")
    var response = await axios({
      method: 'get',
      url: rou,
      headers:{'X-ClientSecret': 'c7d39451-85b1-4e68-a697-6bfec4ee7280' }
    });
  if(response.data.message === 'success'){
    res.redirect('/dashboard')
    return res.status(200).json({
      status: 'success',
      message: 'success',
    });
  }
    
 
  } catch (error) {
    throw error;
  }

});

module.exports = router;
