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


const getReview = function ({page, count, sort, product_id}, callback) {
  const values = [product_id];
  const text = 'SELECT * FROM reviews INNER JOIN reviews_photos ON reviews_photos.review_id = reviews.id WHERE product_id = $1';
  // const text = 'SELECT * FROM reviews WHERE product_id = $1'

  client
    .query(text, values)
    .then(result => callback(null, result.rows))
    .catch(err => callback(err.stack, null))
    .then(() => client.end())
}


//get reviews/meta
const getReviewMeta = function (data, callback) {
  const values = [];
  const text = '';

  //characteristics, characteristics_reviews, reviews

  client
    .query(text, values)
    .then(result => callback(null, result.rows))
    .catch(err => callback(err, null))
    .then(() => client.end())
}


//post /reviews
const postReview = function (bodyData, photosData, characteristicsData, callback) {
  const values = [];
  const text = '';

  //photos has to be seperate post
  //characteristics has to be seperate post

  //post body data
  client
    .query(text, values)
    .then(result => callback(null))
    .catch(err => callback(err, null))
    .then(() => client.end())

  //post photos data
  client
    .query(text, values)
    .then(result => callback(null))
    .catch(err => callback(err, null))
    .then(() => client.end())

  //post characteristics data
  client
    .query(text, values)
    .then(result => callback(null))
    .catch(err => callback(err, null))
    .then(() => client.end())
}


//post /reviews/:review_id/helpful
const putHelpful = function (data, callback) {
  const values = [];
  const text = '';

  client
    .query(text, values)
    .then(result => callback(null))
    .catch(err => callback(err, null))
    .then(() => client.end())
}


//post /reviews/:review_id/report
const putReport = function (data, callback) {
  const values = [];
  const text = '';

  client
    .query(text, values)
    .then(result => callback(null))
    .catch(err => callback(err, null))
    .then(() => client.end())
}


module.exports = {
  getReview: getReview,
  getReviewMeta: getReviewMeta,
  postReview: postReview,
  putHelpful: putHelpful,
  putReport: putReport,
}