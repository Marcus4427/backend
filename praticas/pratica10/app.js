require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;

mongoose.connect(url)
.then(() => console.log("Conectado no MongoDB"))
.catch((err) => {
    console.log("Erro ao conectar no MongoDB", err.message);
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const apidocsRouter = require('./routes/apidocs');
const usuariosRouter = require('./routes/usuariosRouter');

app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;
