const db = require('../Database/database.js')

const getReview = function (data, callback) {
  db.getReview(data, (error, result) => {
    if (error) {
      console.error('controller get review error', error)
    } else {
      callback(null, result)
    }
  })
}

const getReviewMeta = function (data, callback) {
  db.getReviewMeta(data, (error, result) => {
    if (error) {
      console.error('controller get review META error', error)
    } else {
      console.log('controller callback')

      var tranResult = {
        product_id: result.reviews[0].product_id,
        ratings: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        },
        recommended: {
          false: 0,
          true: 0
        },
        characteristics: {}
      };

      result.reviews.map(r => {
        tranResult.ratings[r.rating] += 1;
        tranResult.recommended[r.recommended] += 1;
      })

      result.characteristics.map(c => {
        if (!tranResult.characteristics[c.name]) {
          tranResult.characteristics[c.name] = {
            id: c.id,
            value: 0
          }

            result.values.map(v => {
              var sum = 0;
              var count = 0;

              v.rows.map(r => {
                sum += r.value;
                count += 1;
              })

              if (v.rows[0].characteristic_id === c.id) {
                tranResult.characteristics[c.name].value = sum / count
              }
            })
        }
      })
      callback(null, tranResult)
    }
  })
}

const postReview = function (data, callback) {
  db.postReview(data, (error, result) => {
    if (error) {
      console.error('controller post review error', error)
    } else {
      console.log('post reviews success - controller')
      callback(null, result)
    }
  })
}

const putHelpful = function (data, callback) {
  db.putHelpful(data, (error, result) => {
    if (error) {
      console.error('controller put helpful error', error)
    } else {
      callback(null, result)
    }
  })
}

const putReport = function (data, callback) {
  db.putReport(data, (error, result) => {
    if (error) {
      console.error('controller put report error', error)
    } else {
      callback(null, result)
    }
  })
}

module.exports = {
  getReview: getReview,
  getReviewMeta: getReviewMeta,
  postReview: postReview,
  putHelpful: putHelpful,
  putReport: putReport,
}