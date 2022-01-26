import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

import { startDB } from '../plugins/mongodb'
import { SERVER_PORT, ENVIRONMENT } from './environment'

import routes from './routes';

// Create App
const app = express();

// Init MongoDB Connection
startDB();

// Middlewares
if (ENVIRONMENT == 'development')
    app.use( morgan('dev') );
app.use( helmet() );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cors({ methods: 'GET,POST,PUT,DELETE,OPTIONS' }) );

// Routes
app.use( routes );

// Init Server
app.listen(SERVER_PORT);
if (ENVIRONMENT == 'development')
    console.log('Listen in port',SERVER_PORT);