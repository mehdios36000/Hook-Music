const express = require('express')
const {querySpotify,getTracks,saveTracks} = require('../controllers/DataController')
const router = express.Router();

router.post('/', querySpotify);
router.post("/get-tracks", getTracks);
router.post("/save-tracks", saveTracks);



module.exports ={
    routes:router
}
