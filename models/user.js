const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

        image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    cart: [
        {
            id: String,
            title: String,
            description: String,
            image: String,
            price: Number,
            category: String,
            quantity: { type: Number, default: 1 }
        }
    ]
})

const User = mongoose.model('user',userSchema)

module.exports = User