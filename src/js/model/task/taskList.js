var Backbone = require('backbone')
  , Task = require('./task');

module.exports = Backbone.Collection.extend({
  model: Task
});