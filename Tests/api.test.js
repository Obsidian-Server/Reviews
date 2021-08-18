const frisby = require('frisby');

it('should return a 400 if no params are given with get review', function() {
  return frisby.get('http://localhost:4050/reviews')
    .expect('status', 400)
})

