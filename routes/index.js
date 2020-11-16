const express = require('express');
const router = express.Router();
const database = require('../models');

const { User } = database;
//Render Signup
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
      return res.status(201).json({
        status: 'success',
        userId: email,
      });
    }
    return res.status(409).json({
      status: 'error',
      message: 'User already exist',
    });
 
  } catch (error) {
    console.log(error, 'p')
    throw error
  }

});
module.exports = router;
