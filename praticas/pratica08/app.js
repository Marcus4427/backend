require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const produtosRouter = require('./routes/produtosRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', produtosRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;
