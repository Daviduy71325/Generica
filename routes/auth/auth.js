const express = require('express');
const router = require('express-promise-router')();

const authController = require('../.././controller/auth');

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.logIn);

module.exports = router;