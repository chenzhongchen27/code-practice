const fruitDbService = require('@s-service/base/fruitDb');
const Joi = require('joi');
/**
 * 获取所有水果
 */
async function getFruits(ctx, next) {
    // 进行一些权限刷新
    const fruits = await fruitDbService.getAllFruits();
    ctx.body = fruits;
}
/**
 * 通过 id 获取水果详情
 */
async function getFruitById(ctx, next) {
    // 进行一些权限刷新
    const id = ctx.params.id;
    const fruit = await fruitDbService.getFruitById(id);
    ctx.body = fruit;
}

/**
 * 根据 id 查询是否存在水果
 */
async function validateFruitExistById(ctx, next) {
    const id = ctx.params.id;
    const exist = await fruitDbService.isExistFruit(id);
    if (!exist) {
        ctx.throwCodeError(401, '对应的水果不存在');
    } else {
        return next();
    }
}

/**
 * 根据 id 删除某个水果
 */
async function deleteFruitById(ctx, next) {
    const id = ctx.params.id;
    const result = await fruitDbService.deleteFruitById(id);
    ctx.body = 'delete success';
}

/**
 * 新增水果
 */
async function addFruit(ctx, next) {
    const schema = Joi.object().keys({
        image_id: Joi.number().integer().required(),
        price: Joi.number().integer().required(),
        count: Joi.number().integer().required(),
        likes: Joi.number().integer().required(),
        category_id: Joi.number().integer().required(),
        name: Joi.string().required(),
    });
    const { error, value } = Joi.validate(ctx.request.fields, schema);
    if (error)
        ctx.throw('Invalid', error.message);
    else {
        const fruit = await fruitDbService.saveFruit(value);
        ctx.body = fruit;
    }
}

/**
 * 测试 throwCodeError 事件
 */
function toThrowCodeError(ctx, next) {
    console.log('toThrowCodeError before');
    ctx.throwCodeError(501, '测试ThrowCodeError');
    // await userDbService.getUserById().catch(e=> ctx.throwCodeError(403,e.message))
    console.log('toThrowCodeError after');
}

async function test1(ctx, next) {
    ctx.log.trace('test1中的 trace trace trace trace trace');
    ctx.log.debug('test1中的 debug debug debug debug debug');
    ctx.log.info('test1中的 info info info info info');
    ctx.log.warn('test1中的 warn warn warn warn warn');
    ctx.log.error('test1中的 error error error error error');
    ctx.log.fatal('test1中的 fatal fatal fatal fatal fatal');
    console.log('test1 before');
    ctx.log.info('测试啊测试');
    await next();
    console.log('test1 after');
}

async function test2(ctx, next) {
    console.log('test2 before');
    await next();
    console.log('test2 after');
}

module.exports = {
    getFruits,
    getFruitById,
    addFruit,
    deleteFruitById,
    validateFruitExistById,
    toThrowCodeError,
    test1,
    test2,
};
