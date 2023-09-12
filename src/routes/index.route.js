
const customerRoute = require('./customer.route');
const adminRoute = require('./admin.route');
const siteRoute = require('./site.route');

function route(app) {
    // app.use('/admin', adminRoute);
    app.use('/customer', customerRoute);
    app.use('/', siteRoute);
}

module.exports = route;