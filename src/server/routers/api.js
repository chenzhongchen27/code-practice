const router = require('koa-router')();
const apiController = require('@controller/api');
const redirectController = require('@controller/redirect');

router.get(`/fruits`, apiController.getFruits);
router.get(`/fruit/:id`, apiController.validateFruitExistById, apiController.getFruitById);
router.delete(`/fruit/:id`, apiController.validateFruitExistById, apiController.deleteFruitById);
router.post(`/fruit`, apiController.addFruit);
router.all('/redirect/baidu/**', redirectController.toBaidu);
router.post('/test/throwCodeError', apiController.test1, apiController.test2, apiController.toThrowCodeError);
module.exports = router;
