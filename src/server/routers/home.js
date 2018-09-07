const router = require('koa-router')();
const homeController = require('@controller/home');

router.get(`/`, homeController.index);

module.exports = router;
