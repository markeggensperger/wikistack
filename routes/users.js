//DELETE	/users/123	delete user 123 from the db

const express = require('express');
const router = express.Router();
const userList = require('../views/userList');

router.get('/', async (req, res) => {
  res.send(userList(users));
});

router.post('/', async (req, res) => {
  res.send();
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  res.send();
});

router.delete('/:id', async (req, res) => {
  const id = request.params.id;
  res.send();
});

module.exports = router;
