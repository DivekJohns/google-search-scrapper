require('dotenv').config();// todo only for devlopment not for production 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const logger = require('./common/logger');
const app = express();



// secure headers
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

const {
	NODE_ENV,
	PORT
} = process.env;


mongoose.Promise = global.Promise;

// logs of each api's with reponse time
if ( NODE_ENV === 'production') {
	app.use(require('morgan')('combined', { 'stream': logger.stream}));
} else {
	app.use(require('morgan')('dev', { 'stream': logger.stream}));
}
// tell express to use ip of request
app.set('trust proxy', true);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false,
}));

// require('./config/db');
require('./routes')(app);

//defualt route
app.get('/ping', (req, res) => {
	res.status(200).end('Rocket fired 😎 you can contact satellite now 🛰️🛰️ 🛰️  !');
});
const port = PORT || 80;
app.listen(port, () => logger.info(`Listening on port ${port}`));

module.exports = app;
