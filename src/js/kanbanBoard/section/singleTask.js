var Marionette = require('marionette')
  , template = require('./template/task');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: template,
  events: {
    'click .glyphicon-remove': 'removeTask',
    'click .glyphicon-arrow-right': 'progressTask',
    'click .glyphicon-arrow-left': 'regressTask'
  },
  removeTask: function () {
    this.trigger('task:action', 'remove');
  },
  progressTask: function () {
    this.trigger('task:action', 'progress');
  },
  regressTask: function(){
    this.trigger('task:action', 'regress');
  }
});