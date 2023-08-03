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

    router.get('/parkinglist', async (req, res) => {
        try{
            let items= await Car.find(); // .find is a moongose function that finds all the stuff from the model
            res.render('parkinglist',{cars:items})
            
        }
        catch(error){
            return res.status(400).send({message:'sorry could not get employees'});
            console.log(error);
        }
    })


    router.post('/car/delete', async (req, res) => {
        try{
            await Car.deleteOne({_id: req.body.id});
            res.redirect('back');
    
        }catch(error){
            res.status(400).send('Unable to delete item from the database')
    
        }
    })  

// how to update data
// it involves a get and a post
router.get('/car/edit/:id', async (req, res) => {
    try{
        const emp = await Car.findOne({_id: req.params.id}); //params means its passing by the parameter
        res.render('editcar', {car: emp})

    }catch(error){
        res.status(400).send('Could not find customer in database')
        console.log(error)

    }
})


module.exports = router;

