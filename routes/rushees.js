const express = require('express');
const db = require('../db');

const router = express.Router();

/*
Returns object with the following fields
rusheeId: Int
firstName: String
lastName: String
gtid: String
location: String
*/

router.get('/api/rushees/upstairs', async (req, res) => {
    try {
        let results = await db.getRushees("U");
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/rushees/downstairs', async (req, res) => {
    try {
        let results = await db.getRushees("D");
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/rushees', async (req, res) => {
    try {
        let results = await db.getRushees();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;