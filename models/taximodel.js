const mongoose = require('mongoose')    

const taxiSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true, // this ensures that the field cannont be left empty
        trim: true // this removes any spcae or whitespace between characters

    },
    lastname:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    numberplate:{
        type: String,
        required: true,
        unique: true    // this only allows one value to be saved in the database
    },
    color:{
        type: String
    },
    arrivaltime:{
        type: String,
        required: true

    },
    departuretime:{
        type: String,
    },
    model: {
        type: String,
    },
    phone:{
        type: String,
        required: true,
        unique: true


    },
    date: {
        type: String,
        required: true
    },
    period:{
        type: String,
        required: true,
        enum: ['Day', 'Night', 'Less than 3 hours']
    },
    amount: {
        type: Number,
        required: true,
        enum: [3000, 2000]
    },
    nin:{
        type: String,
        required: true,
        unique: true

    },
    number:{
        type: Number,
        unique: true,
        required: true


    },
    tireclinic:{
        type: [String]
        
    },
    battery: {
        type: String
    },
    valves:{
        type: Number,
        
    },
    puncturefixing:{
        type: Number,
    },
    tirepressure:{
        type: Number,
    }

})

module.exports = mongoose.model('Taxi', taxiSchema)