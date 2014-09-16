var Marionette = require('marionette'), template = require('./template/task');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: template,
  events: {
    'click .glyphicon-remove': 'removeTask',
    'click .glyphicon-arrow-right': 'progressTask',
    'click .glyphicon-arrow-left': 'regressTask'
  },
  removeTask: function () {
    this.trigger('remove:task');
  },
  progressTask: function () {
    this.trigger('progress:task');
  },
  regressTask: function(){
    this.trigger('regress:task');
  }
});