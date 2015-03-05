define(function (require) {
    var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    var util = require('helper/util');
    var jquery = require('vendor/jquery.min');

    // 自动创建console相关API，避免IE低版本报错
    util.log();

    $('p').html('dom handler');

    console.log(messages.getHello());
});
