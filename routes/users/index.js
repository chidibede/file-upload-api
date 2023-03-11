const express = require('express');

const router = express.Router();

router.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: "Chidi" }];
  res.status(200).json(users);
});

module.exports = router;