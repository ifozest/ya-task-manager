var Marionette = require('marionette')
  , template = require('./template/task');


module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: template,
  events: {
    'click .glyphicon-remove': 'removeTask'
  },
  removeTask: function() {
    this.trigger('remove:task');
  }
});