const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const helmet = require('helmet'); 
const morgan = require('morgan')

const router = require('express').Router();
const server = express();

server.use(helmet())
server.use(express.json());
server.use(morgan('dev'));

//ACTION -- CRUD operations
//GET actions
router.get('/', (req, res) => {
    Actions.get() 
    .then(actions => {
    res.status(200).json(actions)
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({error: "The actions could not be retrieved."})
       })  
   })

   //POST actions 
   router.post('/', (req, res) => {
    const {notes, description} = req.body
    if(!notes || !description) {
    res.status(400).json({error: "Please provide a name and description"})
    }

    Actions.insert({notes, description})
    .then(post => {
    res.status(200).json(post)
    })
    // const newObj = {...req.body, project_id: req.params.id}
    // Actions.insert(newObj)
    // .then(addAction => {
    //  res.status(200).json(addAction)
    // })
    .catch(err => {
    res.status(500).json({error: "There was an error adding the action"})
    })
  });

  //DELETE actions
  router.delete('/:id', (req, res) => {
  const id = req.params.id
  Actions.remove(id)
  .then(deleted => {
  res.status(200).json(deleted)
  })
  .catch(err => {
    console.log(err);
   res.status(500).json({message: "There was an error deleting this action"})
    })
  })

  //PUT actions
  router.put('/:id', (req, res) => {
    const {notes, description} = req.body
    if(!notes && !description) {
    res.status(400).json({error: "Please provide a note and description"})
     }
    const id = req.params.id
     Actions.update(id, {notes, description})
     .then(updated => {
     if(updated) {
    res.status(200).json(updated)
     } else {
    res.status(404).json({message: "The action with the specified id does not exist." })
      }
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({error: "The action information could not be modified." })
      }) 
  })

module.exports = router