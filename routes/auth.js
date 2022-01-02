const express = require('express');
const db = require('../db');

const router = express.Router();

// TODO: Add password hash and salt
router.post('/', async (req, res) => {
    try {
        let results = await db.getUserInfo([req.body.user, req.body.pass]);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;