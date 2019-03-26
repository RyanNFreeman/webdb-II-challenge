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

module.exports = router;