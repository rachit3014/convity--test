const express = require('express');
const passport=require('passport')
const {body}=require('express-validator')
const router=express.Router();
;
const UserControler=require('../controllers/user')
router.post('/signup',[body('email').trim().isEmail().withMessage('Invalid input email  '),body('password').notEmpty().withMessage('Invalid input value for field password ')],UserControler.signUp);
router.post('/signin',[body('email').trim().isEmail().withMessage('Invalid input email  '),body('password').notEmpty().withMessage('Invalid input value for field password ')],UserControler.signIn);
router.get('/profile',passport.authenticate('jwt', { session: false }),UserControler.profile);
module.exports=router
