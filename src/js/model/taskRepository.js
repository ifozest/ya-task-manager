var Marionette = require('marionette')
  , TaskList = require('./task/taskList')
  , Task = require('./task/task')
  , guid = require('./../utils/idGenerator');

/**
 *
 * well tasks stored in local storage like:
 * localStorage: {
 *    awaitingTasks: "[]",
 *    inProgressTasks: "[]",
 *    completedTasks: "[]",
 * }
 *
 *
 * @type
 */


var TaskRepository = Marionette.Controller.extend({
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
  saveTasks: function(type) {
    this.localStorage.setItem(type, this.serialize(this.tasks[type]));
  },
  initTasks: function() {
    this.tasks = {};
    this.tasks.awaiting = new TaskList(this.getTasks('awaitining'));
    this.tasks.inProgress = new TaskList(this.getTasks('inProgress'));
    this.tasks.completed = new TaskList(this.getTasks('completed'));
  },
  createNewTask: function(title) {
    var newTask = new Task({title: title, id: guid()});
    this.tasks.awaiting.add(newTask);
    this.saveTasks('awaiting');
    console.log(this.tasks);
  }
});

module.exports = new TaskRepository();