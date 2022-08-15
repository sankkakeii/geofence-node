const express = require('express');
const router = express.Router();
const clientController = require('../controllers/geolocationCheck.controller');

/* CLIENTS WILL BE CALLED TENANTS INTERCHANGEABLY */
router.post('/geo-check', clientController.geoCheck);
router.get('/home', clientController.home);

module.exports = router;