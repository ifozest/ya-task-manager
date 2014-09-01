var Marionette = require('marionette')
  , template = require('./template/template');


module.exports = Marionette.LayoutView.extend({
  template: template,
  regions: {
    awaitingTasks: '#awaitingTasks',
    inProgressTasks: '#inProgressTasks',
    completedTasks: '#completedTasks'
  }
});