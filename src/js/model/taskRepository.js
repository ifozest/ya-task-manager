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

var types = {
  1: 'todo',
  2: 'doing',
  3: 'done'
};


var TaskRepository = Marionette.Controller.extend({
  initialize: function() {
    this.localStorage = window.localStorage;
    this._initTasks();
    this._initEvents();
  },
  serialize: function(object) {
    return JSON.stringify(object);
  },
  deserialize: function(data) {
    return JSON.parse(data);
  },
  fetchTasks: function(type) {
    return this.deserialize(this.localStorage.getItem(type));
  },
  saveTasks: function(type) {
    this.localStorage.setItem(type, this.serialize(this.tasks[type]));
  },
  getTasks: function(){
    return this.tasks;
  },
  createNewTask: function(title) {
    var newTask = new Task({title: title, id: guid()});
    this.tasks.todo.add(newTask);
    this.saveTasks('todo');
    console.log(this.tasks);
  },
  removeTask: function(task){
    var model = task.toJSON()
      , type = types[model.state]
      , taskList = this.tasks[type];
    taskList.remove(task);
    this.saveTasks(type);
  },
  _initTasks: function() {
    this.tasks = {};
    this.tasks.todo = new TaskList(this.fetchTasks('todo'));
    this.tasks.doing = new TaskList(this.fetchTasks('doing'));
    this.tasks.done = new TaskList(this.fetchTasks('done'));
  },
  _initEvents: function(){
    this.on('create:task', this.createNewTask);
  }
});

module.exports = new TaskRepository();