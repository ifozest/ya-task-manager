var Marionette = require('marionette')
  , Modal = require('./../modal/modalRegion')
  , template = require('./template/template');

//var TaskList = require('./../../model/task/taskList');
//var TaskListView = require('./../view/taskList');
//
//var stub = [
//  { title: 'lol', state: 1},
//  { title: 'lol2', state: 2},
//  { title: 'lol3', state: 3},
//  { title: 'lol', state: 1}
//];
//


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
  pressButton: function () {
    this.trigger('button:create:task', this.modal);
  },
  onShow: function(){
    this.trigger('layout:rendered', this);
  }
});