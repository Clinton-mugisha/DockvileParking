const express = require('express');
const Car = require('../models/carmodel')
const router = express.Router();



router.post('/regcar', async(req, res) => {
    try{
        const car = new Car(req.body);
        await car.save();
        console.log(req.body);
        res.redirect('/api/home') // redirect to home page
       
    }catch(error){
        res.status(400).render('carform')
        console.log(error)
        //we redirect a path we render a file

    }

});

    // router.get('/list', async (req, res) => {
    //     try{
    //         let items= await Employee.find(); // .find is a moongose function that finds all the stuff from the model
    //         res.render('employeelist',{employees:items})
            
    //     }
    //     catch(error){
    //         return res.status(400).send({message:'sorry could not get employees'});
    //         console.log(error);
    //     }
    // })


module.exports = router;