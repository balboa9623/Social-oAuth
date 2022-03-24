const express = require('express');
const router = express.Router();

const gitHubController = require("../../controller/gitHub.controller")

router.get('/login/github', gitHubController.login);
router.get('/login/github/callback', gitHubController.callback);
router.get('/admin', gitHubController.admin)

module.exports = router