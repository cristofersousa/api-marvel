const MongooseConnectionConfig = require('mongoose-connnection-config');
 
const opts = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  database: 'my-db',
  user:'csp-marvel',
  pass: '672@j179'
};
const mcc = new MongooseConnectionConfig(opts);
 
console.log(mcc.getMongoUri());