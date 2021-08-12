const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'csvtest',
  port: 5432,
  user: 'sethbaker',
  password: 'password'
});

client
  .connect()
  .then(() => console.log('database connected'))
  .catch(err => console.error('Error connecting to database', err.stack))


const getAll = function (callback) {
  client
    .query('SELECT * FROM reviews')
    .then(result => callback(null, result.rows))
    .catch(err => console.error(err.stack))
    .then(() => client.end())
}

//update get reviews to require product_id
//get /reviews/photos
//get characteristics
//get review characteristics

//post review
//post review photos
//post characteristics
//post characteristics reviews
//post reported
//post helpfulness


module.exports = {
  getAll: getAll,
}