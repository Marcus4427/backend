const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const router = express.Router();

const filePath = path.join(__dirname, '..', 'swagger.yaml');
const file = fs.readFileSync(filePath, 'utf8');

const swaggerDocument = YAML.parse(file);

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;