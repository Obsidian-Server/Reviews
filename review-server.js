const express = require('express');
const app = express();
app.use(express.json())
const db = require('./database.js')



//API ROUTES
app.get('/reviews', (req, res) => {
  db.getAll((err, data) => {
    if (err) {
      console.log('express get error', err)
    } else {
      res.send(data)
    }
  })
})


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



app.listen(4050, () => {
  console.log(`Server listening on port 4050`)
})