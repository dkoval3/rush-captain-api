const mysql = require('mysql');
const creds = require('../credentials.json');

const pool = mysql.createPool(creds);

let rushCaptainDB = {};

// Used to authenticate login credentials
// Could replace id with an array if multiple params
// Using ? instead of string interpolation prevents SQL injection
rushCaptainDB.getUserInfo = ([user, pass]) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE username = ? AND passwordHash = ?;', [user, pass], (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

rushCaptainDB.getBrothers = (all, present) => {
    let sqlQuery;
    if (all) {
        sqlQuery = `SELECT brothers.id AS brotherId, names.firstName, names.lastName, brothers.location FROM names INNER JOIN brothers ON brothers.nameId = names.id;`;
    } else if (present) {
        sqlQuery = `SELECT brothers.id AS brotherId, names.firstName, names.lastName, brothers.location FROM names INNER JOIN brothers ON brothers.nameId = names.id WHERE location != "XX";`;
    } else {
        sqlQuery = `SELECT brothers.id AS brotherId, names.firstName, names.lastName, brothers.location FROM names INNER JOIN brothers ON brothers.nameId = names.id WHERE location = "XX";`;
    }
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

rushCaptainDB.getRushees = (location = "") => {
    let sqlQuery;
    if (location === "") {
        sqlQuery = `SELECT rushees.id AS rusheeId, names.firstName, names.lastName, rushees.gtid, rushees.location FROM names INNER JOIN rushees ON rushees.nameId = names.id;`;
    } else {
        sqlQuery = `SELECT rushees.id AS rusheeId, names.firstName, names.lastName, rushees.gtid, rushees.location FROM names INNER JOIN rushees ON rushees.nameId = names.id WHERE location = "${location}";`;
    }
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

rushCaptainDB.getCycles = (location) => {
    let sqlQuery = `SELECT cycle.id AS cycleId, cycle.brotherId, cycle.rusheeId, CONCAT(names.firstName, " ", names.lastName) AS brotherName, brothers.location, cycle.startTime FROM cycle LEFT JOIN names ON cycle.brotherId = names.id LEFT JOIN brothers ON cycle.brotherId = brothers.id`;

    if (location === "U") {
        sqlQuery += ` WHERE location = "UU" OR "AU" OR "U";`;
    } else if (location === "D") {
        sqlQuery += ` WHERE location = "UD" OR "AD" OR "D";`;
    }

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

rushCaptainDB.updateBrotherCycle = ([newBrotherId, prevBrotherId, cycleId, prevBrotherNewLocation, newBrotherNewLocation]) => {
    let sqlQuery = `UPDATE cycle SET brotherId = ? WHERE id = ?;
    UPDATE cycle SET startTime = NOW() WHERE id = ?;
    UPDATE brothers SET location = ? WHERE id = ?;
    UPDATE brothers SET location = ? WHERE id = ?;`;
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [newBrotherId, cycleId, cycleId, newBrotherNewLocation, newBrotherId, prevBrotherNewLocation, prevBrotherId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// If no rusheeId available, pass "NULL"
rushCaptainDB.addCycle = ([brotherId, rusheeId]) => {
    let sqlQuery = `INSERT INTO cycle (brotherId, rusheeId) VALUES (?, ?);`;
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [brotherId, rusheeId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

rushCaptainDB.deleteCycle = cycleId => {
    let sqlQuery = `DELETE FROM cycle WHERE id = ?;`;
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, cycleId, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = rushCaptainDB;