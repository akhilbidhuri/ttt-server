const frequency = require('../controller/frequency')
module.exports = (app) => {
  app.post('/frequency', frequency.counter)
}