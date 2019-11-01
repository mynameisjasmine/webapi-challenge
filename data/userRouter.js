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

//PROJECT -- CRUD operations
//GET projects
router.get('/', (req, res) => {
 Projects.get() 
 .then(action => {
 res.status(200).json(action)
 })  
})

//GET by project id
router.get('/:id', (req, res) => {
const id = req.params.id
Projects.get(id)
.then(project => {
  res.status(200).json(project)  
})
.catch(err => {
console.log(err);
res.status(500).json({message: "There was an error getting the project"})
 })
})

//POST project
router.post('/', (req, res) => {
const {name, description} = req.body
if(!name || !description) {
res.status(400).json({error: "Please provide a name and description"})
}
const newPost = {...req.body, project_id: req.params.id}
Projects.insert(newPost)
.then(addProject => {
 res.status(200).json(addProject)
})
.catch(err => {
res.status(500).json({error: "There was an error posting this project"})
 })
})

//DELETE project
router.delete('/:id', (req, res) => {
const id = req.params.id
Projects.remove(id)
.then(deleted => {
if(deleted) {
res.status(200).json(deleted)
} else {
res.status(404).json({message: "The post with the specified ID does not exist."})    
}
})
.catch(err => {
res.status(500).json({ error: "The post could not be removed"})
  })
})
//Action CRUD operations



module.exports = router