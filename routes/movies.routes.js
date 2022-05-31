const router = require('express').Router()
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/', (req, res, next) => {
    Movie.find()
    .populate("cast")
    .then ((listMovies) => {
        console.log(listMovies)
      res.render('movies/movies', {listMovies})
    })
    .catch((err) => {
        console.error("Error displaying Movies: ", err);
      })
  });

router.get('/create', (req, res, next) => {
    Celebrity.find()
    .then ((listCelebrities) => {
      res.render('movies/new-movie', {listCelebrities})
    })
  });

router.post('/create', (req, res, next) => {
    // console.log("req.body: ", req.body)
    Movie.create(req.body)
    .then(() => {
      res.redirect('/movies')
      console.log("Movie Created");
    })
    .catch((err) => {
      console.error("Error creating Movie: ", err);
      res.render('movies/new-movie')
    })
});

router.get('/:id/details', (req, res, next) => {
  
    Movie.findById(req.params.id)
    .populate("cast")
    .then ((details) => {
      console.log(details, "here");
      res.render('movies/movie-details', {details})
    })
    .catch((err) => {
        console.error("Error accessing Details: ", err);
      })
  });

  router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
    // Celebrity.find()
    .then ((toEditMovie) => {
      res.render('movies/edit-movie', {toEditMovie})
    })
  });

  /*router.post('/drones/:id/edit', (req, res, next) => {
    // Iteration #4: Update the drone
    Drone.findByIdAndUpdate(req.params.id, req.body)
    .then (() => {
      res.redirect('/drones')
    })
    .catch((err) => {
      console.error("Error updating Drone: ", err);
      res.render('drones/update-form')
    })
  }); */

  router.post('/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
    .then (() => {
      res.redirect('/movies')
    })
    .catch((err) => {
      console.error("Error deleting Movie: ", err);
    })
  });

module.exports = router