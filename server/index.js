// server/server.js

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import express from 'express';
import bodyParser from 'body-parser';


import oracleService from './oracle';

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/data', function (req, res) {
    oracleService.getData(req.body, (rows, lastRow) => {
    res.json({rows: rows, lastRow: lastRow});
    });
});

app.listen(4000, () => {
    console.log('Started on localhost:4000');
});