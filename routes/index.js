const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json({message: "Connected to Rush Captain DB!"});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;