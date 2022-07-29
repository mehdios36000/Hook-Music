const express = require('express')
const {querySpotify,getTracks} = require('../controllers/DataController')
const router = express.Router();

router.post('/', querySpotify);
router.post("/get-tracks", getTracks);



module.exports ={
    routes:router
}
