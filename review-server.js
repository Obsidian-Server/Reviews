const express = require('express');
const app = express();
app.use(express.json())
const db = require('./Database/database.js')
const controller = require('./Controllers/index.js')

app.listen(4050, () => {
  console.log(`Server listening on port 4050`)
})

//API ROUTES
app.get('/reviews', (req, res) => {
  const reqData = {
    page : req.query.page ? req.query.page : 1,
    count : req.query.count ? req.query.count : 5,
    sort : req.query.sort ? req.query.sort : 'newest',
    product_id: req.query ? req.query.product_id : null
  }

  //error 400 if no product_id is given.
  if (!reqData.product_id) {
    res.sendStatus(400)
  }

  controller.getReview(reqData, (err, data) => {
    if (err) {
      console.log('express get /reviews error', err)
      res.status(404).send(err)
    } else {
      res.status(200).send(data)
    }
  })

})

//get reviews/meta
app.get('/reviews/meta', (req, res) => {
  const reqData = {
    product_id: req.query.product_id ? req.query.product_id : null
  }

  //error 400 if no product_id is given.
  if (!reqData.product_id) {
    res.sendStatus(400)
  }

  controller.getReviewMeta(reqData, (err, data) => {
    if (err) {
      console.error('express get /reviews/meta error', err)
      res.status(404).send(err)
    } else {
      res.status(200).send(data)
    }
  })

})

//post /reviews
app.post('/reviews', (req, res) => {
  // console.log('report route')

  const reqData = {
    bodyData: {
      product_id: req.query.product_id ? req.query.product_id : null,
      rating: req.query.rating ? req.query.rating : null,
      summary: req.query.summary ? req.query.summary : null,
      body: req.query.body ? req.query.body : '',
      recommend: req.query.recommend ? req.query.recommend : null,
      name: req.query.name ? req.query.name : null,
      email: req.query.email ? req.query.email : null,
    },
    photosData: {
      photos: req.query.photos ? req.query.photos : []
    },
    characteristicsData: {
      characteristics: req.query.characteristics ? req.query.characteristics : null
    }
  }

  controller.postReview(reqData, (err, data) => {
    if (err) {
      console.error('error posting review body', err)
      res.status(404)
    } else {
      //something else
    }
  })

})

//put /reviews/:review_id/helpful
app.put('/reviews/:review_id/helpful', (req, res) => {

  reqData = {
    review_id: req.params.review_id ? req.params.review_id : null
  }

  if (!reqData.review_id) {
    res.sendStatus(400)
  }

  controller.putHelpful(reqData, (err, data) => {
    if (err) {
      console.error('error putting helpful', err)
      res.status(404)
    } else {
      res.sendStatus(204)
    }
  })
})

//put /reviews/:review_id/report
app.put('/reviews/:review_id/report', (req, res) => {

  reqData = {
    review_id: req.params.review_id ? req.params.review_id : null
  }

  if (!reqData.review_id) {
    res.sendStatus(400)
  }

  controller.putReport(reqData, (err, data) => {
    if (err) {
      console.error('error putting report', err)
      res.status(404)
    } else {
      res.sendStatus(204)
    }
  })
})