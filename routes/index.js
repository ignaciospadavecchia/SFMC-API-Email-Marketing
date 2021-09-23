const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const salesforceController = require('../controllers/salesforceController');
require('dotenv').config();
const { SUBDOMAIN, ACCESS_TOKEN, DATA_EXTENSION_KEY, CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID } = process.env
// * TechDebt: use Express validator to doble-check input fields in the server. 
// * Learn how to do a third validation in Salesforce Marketing Cloud

router.get('/', indexController.renderHome);
router.post('/salesforce', salesforceController.getCustomerSurveyData);

module.exports = router;
