const express = require('express');
const mysql = require('mysql');
const apiRouter = require('./routes');
const authRouter = require('./routes/auth.js');
const brothersRouter = require('./routes/brothers.js');
const rusheesRouter = require('./routes/rushees.js');
const cycleRouter = require('./routes/cycle.js');

const PORT = process.env.PORT || '3000';
const app = express();

app.use(express.json());
app.use('/api/test', apiRouter);
app.use('/auth/login', authRouter);
app.use(brothersRouter);
app.use(rusheesRouter);
app.use(cycleRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})