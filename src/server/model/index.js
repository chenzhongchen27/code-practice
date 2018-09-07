const db = require('./db');

const User = db.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    orders() {
        return this.hasMany(Order);
    },
    cart() {
        return this.hasOne(Cart);
    },
});

const Image = db.Model.extend({
    tableName: 'image',
    idAttribute: 'id',
});

const Fruit = db.Model.extend({
    tableName: 'fruit',
    idAttribute: 'id',
    hasTimestamps: true,
    category() {
        return this.belongsTo(Category);
    },
    image() {
        return this.belongsTo(Image);
    },
    carts() {
        return this.belongsToMany(Cart, 'cart_fruit');
    },
});

const Cart = db.Model.extend({
    tableName: 'cart',
    idAttribute: 'id',
    hasTimestamps: true,
    fruits() {
        return this.belongsToMany(Fruit, 'cart_fruit');
    },
    user() {
        return this.belongsTo(User);
    },
});

const Archive = db.Model.extend({
    tableName: 'archive',
    idAttribute: 'id',
    hasTimestamps: true,
});

const Category = db.Model.extend({
    tableName: 'category',
    idAttribute: 'id',
    hasTimestamps: true,
    fruits() {
        return this.hasMany(Fruit);
    },
});

const Order = db.Model.extend({
    tableName: 'order',
    idAttribute: 'id',
    hasTimestamps: true,
    archives() {
        return this.hasMany(Archive);
    },
});

module.exports = {
    User,
    Fruit,
    Image,
    Cart,
    Archive,
    Category,
    Order,
};
