const express = require('express');
const db = require('../db');

const router = express.Router();
/*
Returns object with following fields
brotherId: Int
firstName: String
lastName: String
location: String
*/

router.get('/api/brothers/present', async (req, res) => {
    try {
        let results = await db.getBrothers(false, true);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/brothers/absent', async (req, res) => {
    try {
        let results = await db.getBrothers(false, false);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/brothers', async (req, res) => {
    try {
        let results = await db.getBrothers(true, true);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;