const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js')
const helmet = require('helmet'); 
const morgan = require('morgan')

const router = require('express').Router();
const server = express();

server.use(helmet())
server.use(express.json());
server.use(morgan('dev'));

module.exports = router