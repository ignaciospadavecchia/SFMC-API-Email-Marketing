const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const salesforceController = require('../controllers/salesforceController');

router.get('/', indexController.renderHome);
router.post('/salesforce', salesforceController.getCustomerSurveyData);

module.exports = router;
