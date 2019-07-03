// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const cors = require('cors');

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './dresses.db'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
});

const Dress = sequelize.define('dress', {
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    style: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    length: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }

});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    console.log('connected to the server');
    res.json({ message: 'hooray! welcome to our api!' });
    Dress.create({color: 'red', style: 'Bodycon', size: 's', length: 'Mini', price: 1.1})
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(cors())

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);