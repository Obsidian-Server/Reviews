const express = require('express');
const app = express();
app.use(express.json())
const db = require('./Database/database.js')

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

  db.getReviews(reqData, (err, data) => {
    if (err) {
      console.log('express get /reviews error', err)
    } else {
      res.send(data)
    }
  })
})


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



