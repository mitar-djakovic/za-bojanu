import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { errorHandler } from './middleware/errorHandler';
import api from './api';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(api);
app.use(errorHandler);

const PORT = 8001;

app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
});
