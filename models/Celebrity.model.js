const {model, Schema} = require('mongoose')
const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
})

const Celebrity = model('celebrity', celebritySchema)

module.exports = Celebrity