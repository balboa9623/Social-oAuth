const express = require('express');
const router = express.Router();

const gitHubController = require("../../controller/gitHub.controller")

router.get('/login/github', gitHubController.login);
router.get('/login/github/callback', gitHubController.callback);

module.exports = router