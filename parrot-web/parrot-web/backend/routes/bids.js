const router = require('express').Router();
router.get('/', (req, res) => res.json({ message: 'Route file' }));
module.exports = router;
