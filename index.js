// Require modules
const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));
app.use(express.static(__dirname+'/public'));



// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// Get database models
const allModels = require('./db');

// Get routes
const setRoutesFunction = require('./routes');
setRoutesFunction(app, allModels);

// Listen to requests on port 3000
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){
    server.close(() => {
        console.log('Process terminated');
        allModels.pool.end( () => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);