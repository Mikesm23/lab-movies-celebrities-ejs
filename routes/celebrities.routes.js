const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get('/', (req, res, next) => {
    Celebrity.find()
    .then ((listCelebrities) => {
      res.render('celebrities/celebrities', {listCelebrities})
    })
    .catch((err) => {
        console.error("Error displaying Celebrities: ", err);
      })
  });

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
  });

router.post('/create', (req, res, next) => {
    Celebrity.create(req.body)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch((err) => {
      console.error("Error creating Celebrity: ", err);
      res.render('celebrities/new-celebrity')
    })
});


module.exports = router