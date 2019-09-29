const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
 Notes: Learn about SchemaTypes: https://mongoosejs.com/docs/schematypes.html

  class or collumn 
  
  Person
  -------------------------
  key           |   type
  -------------------------
  id            |   Number
  name:         |   String
  age:          |   Number
  power:        |   Number
  description:  |   String
  ------------------------
*/

const PersonSchema = new Schema({
  name: String,
  age: Number,
  power: Number,
  description: String
})

module.exports = mongoose.model('Person', PersonSchema);