
const mongoose = require('mongoose');

function connectMongoDB(uri) {
    const conn = mongoose.createConnection(uri);
    conn.on('connected', function() {
        console.log(`Connect mongodb :: ${this.name} :: database name successfully!`);
    });
    conn.on('disconnected', function() {
        console.log(`Connect mongodb :: ${this.name} :: database name failed!`);
    });
    conn.on('error', function(error) {
        console.log(`Connect mongodb error :: ${JSON.stringify(error)}!`);
    });
    return conn;
}

const testConn = connectMongoDB(process.env.URI_MONGODB_TEST);
const customerConn = connectMongoDB(process.env.URI_MONGODB_CUSTOMER);

module.exports = { testConn, customerConn };
