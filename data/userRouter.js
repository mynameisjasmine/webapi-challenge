const express = require('express');
const Projects = require('../data/helpers/projectModel.js')
const Actions = require('../data/helpers/actionModel.js');
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
 .then(projects => {
 res.status(200).json(projects)
 })
 .catch(err => {
 console.log(err);
 res.status(500).json({error: "The projects could not be retrieved."})
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

Projects.insert(req.body)
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


//PUT project
 router.put('/:id', (req, res) => {
const {name, description} = req.body
if(!name && !description) {
res.status(400).json({error: "Please provide a name and description"})
 }
const id = req.params.id
 Projects.update(id, {name, description})
 .then(updated => {
 if(updated) {
res.status(200).json(updated)
 } else {
res.status(404).json({message: "The post with the specified id does not exist." })
  }
})
.catch(err => {
console.log(err);
res.status(500).json({error: "The post information could not be modified." })
  })
 });


module.exports = router