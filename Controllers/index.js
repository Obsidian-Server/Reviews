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
      console.error('controller get review error', error)
    } else {
      callback(null, result)
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