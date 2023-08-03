const express = require('express');
const Truck = require('../models/truckmodel')
const router = express.Router();



router.post('/regtruck', async(req, res) => {
    try{
        const truck = new Truck(req.body);
        await truck.save();
        console.log(req.body);
        res.redirect('/api/home') // redirect to home page
       
    }catch(error){
        res.status(400).render('truckform')
        console.log(error)
        //we redirect a path we render a file

    }

});

    router.get('/trucklist', async (req, res) => {
        try{
            let items= await Truck.find(); // .find is a moongose function that finds all the stuff from the model
            res.render('Trucklist',{trucks:items})
            
        }
        catch(error){
            return res.status(400).send({message:'sorry could not get customers'});
            console.log(error);
        }
    })


    router.post('/truck/delete', async (req, res) => {
        try{
            await Truck.deleteOne({_id: req.body.id});
            res.redirect('back');
    
        }catch(error){
            res.status(400).send('Unable to delete item from the database')
    
        }
    })  

// how to update data
// it involves a get and a post
router.get('/truck/edit/:id', async (req, res) => {
    try{
        const emp = await Truck.findOne({_id: req.params.id}); //params means its passing by the parameter
        res.render('edittruck', {truck: emp})

    }catch(error){
        res.status(400).send('Could not find customer in database')
        console.log(error)

    }
})


module.exports = router;

