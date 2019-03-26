const express = require('express')
const router = express.Router()

const knex = require('knex');
const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.sqlite3',
    },
  };
  
const db = knex(knexConfig);

// endpoints here

// CREATE of CRUD ops
router.post('/', (req, res) => {
    db('zoos')
    .insert(req.body)
    .then(ids => {
        const id = ids[0];
        db('zoos')
        .where({id})
        .first()
        .then(animal => {
            res.status(201).json(animal)
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
}) //WORKING

// READ of CRUD ops
router.get('/', (req, res) => {
    db('zoos')
    .then(roles => {
      res.status(200).json(roles)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}) //WORKING

router.get('/:id', (req, res) => {
    const animalId = req.params.id;
    db('zoos')
        .where( {id: animalId} )
        .first()
        .then(animal => {
            res.status(200).json(animal)
    })
        .catch(err => {
            res.status(500).json(err)
    })
}) //WORKING

//UPDATE of CRUD ops
router.put('/:id', (req, res) => {
    db('zoos')
    .where( {id: req.params.id })
    .update(req.body)
    .then(count => {
        count ? res.status(200).json(count) : res.status(404).json({ message: 'Record does not exist'})
    })
    .catch(err => {
        res.status(500).json(err)
    })

}) //WORKING

//DELETE of CRUD ops
router.delete('/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        count ? res.status(204).end() : res.status(404).json({ message: 'Record does not exist'})
    })
    .catch(err => {
        res.status(500).json(err)
    })
}) //WORKING

module.exports = router;