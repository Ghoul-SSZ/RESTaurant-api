const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const restaurantRouter = require('./router/restaurantRouter');
const config = require('./config/config');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
//connecting to mongodb
mongoose.connect('mongodb://localhost:27017/viaplay', { useNewUrlParser: true });

//middleware
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(morgan('dev'));

//swagger api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//routing
app.use('/api/restaurant', restaurantRouter);

//listen on port 3000 right now
app.listen(config.port, () => {
	console.log(`server is running in port: ${config.port}`);
});
