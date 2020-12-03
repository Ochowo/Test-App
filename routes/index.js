const  sha256  =  require('js-sha256');
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

router.get('/error', async (req, res)=>{
  res.render('error');
});
router.get('/register', async (req, res)=>{
  res.render('register');
});

router.get('/dashboard', async (req, res)=>{
  res.render('dashboard');
});
router.post('/signup', async (req, res) => {
  const email = req.body;
  var dateObj = new Date();
      var formatedDate = dateObj.toISOString().replace('-', '').replace('-', '').replace(':', '').replace(':', '').replace('Z', '').replace('T', '');
      var newd = formatedDate.split('.')[0];
      var appKey = 'c7d39451-85b1-4e68-a697-6bfec4ee7280';
      var pas = 'password123';
      var encrypted = sha256(appKey+'_'+newd+'_'+pas)
      var route = 'http://10.100.67.113/spb2b/api/centralauth/CASUsers/enrollUsers'
    await axios({
      method: 'post',
      url: route,
      headers:{'client': 'c7d39451-85b1-4e68-a697-6bfec4ee7280', 'timestamp': newd, 'apikey': encrypted },
      data: {user_id:email, grp_id:2}
    }).then((response) => {
      console.log(response, 'fdgfdg');
      return res.status(201).json({
        status: 'success',
        userId: email
      });
    }, (error) => {
      console.log(error);
    });
    
})
router.post('/register', async (req, res)=>{
  const {
     email,
    } = req.body;
  try {
    
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: req.body,
    });
    
    if (created) {
      return res.status(201).json({
        status: 'success',
        message: 'User registered',
      });
    }
     return res.status(409).json({
      status: 'error',
      message: 'User already exist',
    });
    
 
  } catch (error) {
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
    if(!user){
      res.render('error', user);
      return res.status(401).json({
        status: 'failed',
        message: 'User does not exist',
      });
    }
    if (user.comparePassword(passType, user)) {
      console.log(user, 'error9')
      const data = { user };
      return res.status(200).json({
        status: 'success',
        message: 'success',
        data:  data,
        extra: ' {"mobile": "09061243854"}'
      });
    } 
    console.log(user, 'error3')
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid credentials',
    });
 
  } catch (error) {
    return res.status(401).json({
      status: 'failed',
    });
  }

});

router.get('/success', async (req, res)=>{
  console.log('dd');  
  const {
     token
    } = req.query;
    var dateObj = new Date();
          var formatedDate = dateObj.toISOString().replace('-', '').replace('-', '').replace(':', '').replace(':', '').replace('Z', '').replace('T', '');
          var newd = formatedDate.split('.')[0];
          var appKey = 'c7d39451-85b1-4e68-a697-6bfec4ee7280';
          var pas = 'password123';
          var encrypted = sha256(appKey+'_'+newd+'_'+pas)
  try {
    var rou = 'http://10.100.67.113/spb2b/api/centralauth/CASUsers/confirmUser?token='+token;
 
    var response = await axios({
      method: 'get',
      url: rou,
      headers:{'client': 'c7d39451-85b1-4e68-a697-6bfec4ee7280', 'timestamp': newd, 'apikey': encrypted }
    });
  if(response.data.message === 'success'){
    res.redirect('/dashboard')
  }
    
 
  } catch (error) {
    throw error;
  }

});


module.exports = router;
