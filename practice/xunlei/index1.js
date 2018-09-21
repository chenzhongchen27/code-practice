function EventEmitter() {
    this.events = {};
}
EventEmitter.prototype.on = function on(event, fn) {
    const obj = new EventFun(fn);
    if (this.events[event]) {
        this.events[event].push(obj);
    } else {
        this.events[event] = [obj];
    }
};
EventEmitter.prototype.once = function once(event, fn) {
    const obj = new EventFun(fn, true);
    if (this.events[event]) {
        this.events[event].push(obj);
    } else {
        this.events[event] = [obj];
    }
};
EventEmitter.prototype.remove = function remove(event, fn) {
    if (!this.events[event])
        return;

    const newEvents = [];
    this.events[event].forEach((obj) => {
        if (obj.fn !== fn)
            newEvents.push(obj);
    });
    this.events[event] = newEvents;
};

EventEmitter.prototype.emit = function emit(event) {
    if (!this.events[event])
        return;

    const args = Array.prototype.slice.call(arguments, 1);
    const newEvents = [];
    this.events[event].forEach((obj) => {
        const fn = obj.fn;
        const once = obj.once;
        fn.apply(this, args);
        if (!once)
            newEvents.push(obj);
    });
    this.events[event] = newEvents;
};

/**
 * 回调函数
 * @param {*} fn
 * @param {*} once - 是否一次
 */
function EventFun(fn, once) {
    this.fn = fn;
    if (once)
        this.once = true;
    else
        this.once = false;
}

const e = new EventEmitter();
let count = 0;
e.on('test', (num1, num2) => {
    count = num1 + num2;
    console.log(count);
});
e.emit('test', 1, 2);
