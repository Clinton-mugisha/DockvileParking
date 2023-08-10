const mongoose = require('mongoose')    
const  passportLocalMongoose = require('passport-local-mongoose')

const signupSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
    },
    email:{
        type: String,   // this only allows one value to be saved in the database
        trim: true,
    },
    password:{
        type: String,
        trim: true,
    }
})

signupSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
module.exports = mongoose.model('Signup', signupSchema);