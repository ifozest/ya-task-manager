var Marionette = require('marionette')
  , Modal = require('./../modal/modalRegion')
  , template = require('./template/template');

module.exports = Marionette.LayoutView.extend({
  template: template,
  regions: {
    awaitingTasks: '#awaitingTasks',
    inProgressTasks: '#inProgressTasks',
    completedTasks: '#completedTasks',
    modal: {
      selector: '#modal',
      regionClass: Modal
    }
  },
  ui: {
    button: '#createTask'
  },
  events: {
    'click @ui.button': 'pressButton'
  },
  pressButton: function() {
    this.trigger('layout:show:modal');
  },
  onShow: function() {
    this.trigger('layout:rendered');
  }
});