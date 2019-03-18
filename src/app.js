const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const restaurantRouter = require('./router/restaurantRouter');
const config = require('./config/config');

const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/viaplay', { useNewUrlParser: true });

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/restaurant', restaurantRouter);

app.listen(config.port, () => {
	console.log(`server is running in port: ${config.port}`);
});
