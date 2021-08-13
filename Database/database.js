const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'reviews_master',
  port: 5432,
  user: 'sethbaker',
  password: 'password'
});

client
  .connect()
  .then(() => console.log('database connected'))
  .catch(err => console.error('Error connecting to database', err.stack))


const getReviews = function ({page, count, sort, product_id}, callback) {

  const values = [product_id];
  // const text = 'SELECT * FROM reviews WHERE product_id = $1 INNER JOIN reviews_photos ON reviews_photos.review_id = reviews.id';
  const text = 'SELECT * FROM reviews_photos WHERE review_id = $1'
    //needs to fetch review photos. join table needed with reviews.

  client
    .query(text, values)
    .then(result => callback(null, result.rows))
    .catch(err => console.error(err.stack))
    .then(() => client.end())
}

//update get reviews to require product_id
//get reviews meta
//get characteristics
//get review characteristics

//post review
//post review photos
//post characteristics
//post characteristics reviews
//post reported
//post helpfulness


module.exports = {
  getReviews: getReviews,
}