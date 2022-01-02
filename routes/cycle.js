const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/api/cycle/upstairs', async (req, res) => {
    try {
        let results = await db.getCycles("U");
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/cycle/downstairs', async (req, res) => {
    try {
        let results = await db.getCycles("D");
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/cycle', async (req, res) => {
    try {
        let results = await db.getCycles("");
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/api/cycle', async (req, res) => {
    try {
        let results = await db.addCycle([req.body.brotherId, req.body.rusheeId]);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/api/cycle/:cycleId', async (req, res) => {
    try {
        let cycleId = req.params.cycleId;
        let { newBrotherId, prevBrotherId, prevBrotherNewLocation, newBrotherNewLocation } = req.body;
        let results = await db.updateBrotherCycle([newBrotherId, prevBrotherId, cycleId, prevBrotherNewLocation, newBrotherNewLocation]);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/api/cycle/:cycleId', async (req, res) => {
    try {
        let results = await db.deleteCycle(req.params.cycleId);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;