var Marionette = require('marionette')
  , TaskList = require('./../model/task/taskList');

/**
 * well tasks stored in local storage like:
 * localStorage: {
 *    awaitingTasks: "[]",
 *    inProgressTasks: "[]",
 *    completedTasks: "[]",
 * }
 *
 *
 * @type {*}
 */


module.exports = Marionette.Controller.extend({
  initialize: function() {
    this.localStorage = window.localStorage;
    this.initTasks();
  },
  serialize: function(object) {
    return JSON.stringify(object);
  },
  deserialize: function(data) {
    return JSON.parse(data);
  },
  getTasks: function(type) {
    return this.deserialize(this.localStorage.getItem(type));
  },
  saveTasks: function() {

  },
  initTasks: function() {
    this.tasks = {};
    this.tasks.awaiting = new TaskList(this.getTasks('awaitining'));
    this.tasks.inProgress = new TaskList(this.getTasks('inProgress'));
    this.tasks.completed = new TaskList(this.getTasks('completed'));
  }
});