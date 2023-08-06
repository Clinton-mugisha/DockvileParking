const express = require('express');
const Car = require('../models/carmodel')
const router = express.Router();
const { calculateTotalAmount } = require('../controllers/utils');



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
            let amount = await Car.aggregate([
                {'$group': {_id: '$all',
            totalamount: {$sum: '$amount'}
        }}
//let ages =group{totalAge{sum}}
            ])  
            res.render('parkinglist',{cars:items, custotal:amount[0].totalamount })
            
            
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
        const cr = await Car.findOne({_id: req.params.id}); //params means its passing by the parameter
        res.render('editcar', {car: cr})

    }catch(error){
        res.status(400).send('Could not find customer in database')
        console.log(error)

    }
})
//this is our post route for the newly editted data (updating)
router.post('/car/edit', async (req, res) => {
    try{
        await Car.findOneAndUpdate({_id: req.query.id},req.body);
        res.redirect('/api/parkinglist')

    }catch(error){
        res.status(400).send('Could not edit car data') 
        console.log(error)

    }
})


module.exports = router;

