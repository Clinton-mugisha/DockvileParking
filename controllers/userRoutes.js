const express = require('express')
const router = express.Router();
const  Signup = require('../models/usermodel');
const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('signup');
})
 
router.post('/register', async (req, res) => {
    try{
    const user =  new Signup(req.body);
    console.log(req.body);
    await Signup.register(user, req.body.password); //.register is a keyword which means the model is being saved to the authentication model
    res.redirect('back');
    }catch(error){
        res.status(400).send({message: 'could not register'});
        console.log(error);

    }
})


router.post('/login', passport.authenticate('local',
{failureRedirect: '/api/login'}),
(req, res) => {
    req.session.user = req.user
    let loggedinUser = req.session.user.name;
    console.log(loggedinUser);
    res.redirect('/api/home');
}
)

router.get('/login', (req, res) => {
    res.render('signup');
})
module.exports = router;