
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

function middleware(app, express) {
    app.use(morgan('combined'));
    app.use(express.static(path.resolve('src', 'public')));
    app.use(methodOverride('_method'));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    // app.use(cors());
    // app.use(helmet());
    app.use(cookieParser());
    app.engine('hbs', engine({
        extname: '.hbs'
    }))
    app.set('view engine', 'hbs')
    app.set('views', path.resolve('src', 'resources', 'views'));
}

module.exports = { middleware };