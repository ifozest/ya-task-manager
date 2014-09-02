var Marionette = require('marionette')
  , template = require('./template/template');


module.exports = Marionette.LayoutView.extend({
  template: template,
  regions: {
    awaitingTasks: '#awaitingTasks',
    inProgressTasks: '#inProgressTasks',
    completedTasks: '#completedTasks'
  },
  ui: {
    button: '#createTask'
  },
  events: {
    'click @ui.button': 'pressButton'
  },
  pressButton: function () {
    //TODO pass in controller
    //TODO create new task
  }
});