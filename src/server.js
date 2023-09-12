// Import library
const express = require('express');
const app = express();
const createError = require('http-errors');
const server = require('http').createServer(app);
require('dotenv').config();
const route = require('./routes/index.route');
const { middleware } = require('./app/middlewares/index.middleware');
const { connectRedis } = require('./configs/redis.config');
connectRedis();

// Use middleware
middleware(app, express);

// Use route
route(app);

// catch error

app.use((req, res, next) => {
    next(createError.NotFound('This page is not found.'));
});

app.use((err, req, res, next) => {
    return res.json({
        status: err.status,
        message: err.message
    })
});

// Import port gate
const port = process.env.PORT || 4444;

// Start server
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});