const { Client, Pool } = require('pg');
const pool = new Client({
  host: 'localhost',
  database: 'csvtest',
  port: 5432,
  user: 'sethbaker',
  password: 'password'
});

pool
  .connect()
  .then(() => console.log('database connected'))
  .catch(err => console.error('Error connecting to database', err.stack))


const getReview = function ({page, count, sort, product_id}, callback) {
  const values = [product_id];
  const text = 'SELECT * FROM reviews INNER JOIN reviews_photos ON reviews_photos.review_id = reviews.id WHERE product_id = $1';
  // const text = 'SELECT * FROM reviews WHERE product_id = $1'

  // pool
  //   .query(text, values)
  //   .then(result => callback(null, result.rows))
  //   .catch(err => callback(err.stack, null))
  //   .then(() => client.end())
}


//get reviews/meta
const getReviewMeta = function ({product_id}, callback) {

  var resultData = {
    reviews: {},
    characteristics: {},
    values: {}
  }

  pool.query('SELECT * FROM reviews WHERE product_id = $1', [product_id])
  .then((result) => resultData.reviews = result.rows)
  .then(() => {
    var calls = [pool.query('SELECT * FROM characteristics WHERE product_id = $1', [product_id])]
    return calls;
  })
  .then(calls => {return Promise.all(calls)})
  .then(result => {
    resultData.characteristics = result[0].rows;

    var charIds = [];
    resultData.characteristics.map(row => {
      charIds.push(row.id)
    })

    var idCalls = [];
    charIds.map(id => {
      idCalls.push(pool.query('SELECT * FROM characteristics_reviews WHERE characteristic_id = $1', [id]))
    })
    return idCalls;
  })
  .then((idCalls) => {return Promise.all(idCalls)})
  .then((result) => resultData.values = result)
  .then(() => callback(null, resultData))
  .catch(err => callback(err, null))
  .then(() => pool.end())
}

//post /reviews
const postReview = function ({bodyData, photosData, characteristicsData}, callback) {

  pool.query('INSERT INTO reviews (product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, current_timestamp, $3, $4, $5, false, $6, $7, null, 0) RETURNING id',
    [bodyData.product_id, bodyData.rating, bodyData.summary, bodyData.body, bodyData.recommend, bodyData.name, bodyData.email]
  )
  .then(result => {
    var calls = []
    photosData.photos.map(photo => {
      calls.push(pool.query('INSERT INTO reviews_photos (review_id, photos) VALUES ($1, $2)', [result.rows[0].id, photo]))
    })
    for (var key in characteristicsData.characteristics) {
      calls.push(pool.query('INSERT INTO characteristics_reviews (characteristic_id, review_id, value) VALUES ($1, $2, $3)', [key, result.rows[0].id, characteristicsData.characteristics[key]]))
    }
    return calls;
  })
  .then(calls => Promise.all(calls))
  .then(result => callback(null, result))
  .catch(err => callback(err, null))
  .then(() => pool.end())
}

//post /reviews/:review_id/helpful
const putHelpful = function ({review_id}, callback) {
  const values = [review_id];
  const text = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1';

  pool
    .query(text, values)
    .then(result => callback(null))
    .catch(err => callback(err, null))
    .then(() => pool.end())
}

//post /reviews/:review_id/report
const putReport = function ({review_id}, callback) {
  const values = [review_id];
  const text = 'UPDATE reviews SET reported = NOT reported WHERE id = $1';

  pool
    .query(text, values)
    .then(result => callback(null))
    .catch(err => callback(err, null))
    .then(() => pool.end())
}

module.exports = {
  getReview: getReview,
  getReviewMeta: getReviewMeta,
  postReview: postReview,
  putHelpful: putHelpful,
  putReport: putReport,
}