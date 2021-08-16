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

  const reqData = {
    bodyData: {
      product_id: req.body.product_id ? req.body.product_id : null,
      rating: req.body.rating ? req.body.rating : null,
      summary: req.body.summary ? req.body.summary : null,
      body: req.body.body ? req.body.body : '',
      recommend: req.body.recommend ? req.body.recommend : null,
      name: req.body.name ? req.body.name : null,
      email: req.body.email ? req.body.email : null,
    },
    photosData: {
      photos: req.body.photos ? req.body.photos : []
    },
    characteristicsData: {
      characteristics: req.body.characteristics ? req.body.characteristics : null
    }
  }

  if (Object.values(reqData.bodyData).includes(null) || Object.values(reqData.photosData).includes(null)) {
    res.sendStatus(400)
  } else {
    controller.postReview(reqData, (err, data) => {
      if (err) {
        console.error('error posting review body', err)
        res.sendStatus(404)
      } else {
        res.sendStatus(201)
      }
    })
  }
})

//put /reviews/:review_id/helpful
app.put('/reviews/:review_id/helpful', (req, res) => {

  reqData = {
    review_id: req.params.review_id ? req.params.review_id : null
  }

  if (!reqData.review_id) {
    res.sendStatus(400)
  } else {
    controller.putHelpful(reqData, (err, data) => {
      if (err) {
        console.error('error putting helpful', err)
        res.status(404)
      } else {
        res.sendStatus(204)
      }
    })
  }
})

//put /reviews/:review_id/report
app.put('/reviews/:review_id/report', (req, res) => {

  reqData = {
    review_id: req.params.review_id ? req.params.review_id : null
  }

  if (!reqData.review_id) {
    res.sendStatus(400)
  } else {
    controller.putReport(reqData, (err, data) => {
      if (err) {
        console.error('error putting report', err)
        res.status(404)
      } else {
        res.sendStatus(204)
      }
    })
  }
})