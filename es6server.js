import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import carersApi from './routes/carer.routes';
import adminApi from './routes/admin.routes';
import serverConfig from './config';

// Initialize the Express App
const app = new Express();

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error, connection) => {
	if (error) {
	    console.error(`Ensure MongoDB is running. Using connection string: ${serverConfig.mongoURL}`);
		throw error;
	}
});

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/', adminApi);
app.use('/', carersApi);

app.listen(serverConfig.port, (error) => {
	if (!error) {
	    console.log(`BestChoiceCare API is running on port: ${serverConfig.port}!`);
    }
});