const mongoose = require('mongoose')

const Person = mongoose.model('Person',{
    name: String,
    email: String,
    password: String,
    phone: String,     
})

module.exports = Person // estou exportando o objeto para poder resgatar em outro lugar