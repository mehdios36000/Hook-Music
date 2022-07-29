const express = require('express')
const {querySpotify} = require('../controllers/DataController')
const router = express.Router();

router.post('/', querySpotify);



module.exports ={
    routes:router
}
