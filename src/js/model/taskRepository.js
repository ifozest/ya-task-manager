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

types = ['todo', 'doing', 'done'];


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
  },
  progressTask: function(task){
    var modelType = task.toJSON().state
      , type = types[modelType]
      , previousTaskList = this.tasks[type]
      , newModelType = modelType + 1
      , newType = types[newModelType]
      , newTaskList;

    if (newModelType > (types.length-1)){
      return;
    }
    newTaskList = this.tasks[newType];
    previousTaskList.remove(task);
    task.set('state', newModelType);
    newTaskList.add(task);
    this.saveTasks(type);
    this.saveTasks(newType);

  },
  regressTask: function(task){
    var modelType = task.toJSON().state
      , type = types[modelType]
      , previousTaskList = this.tasks[type]
      , newModelType = modelType - 1
      , newType = types[newModelType]
      , newTaskList;

    if (newModelType < 0){
      return;
    }
    newTaskList = this.tasks[newType];
    previousTaskList.remove(task);
    task.set('state', newModelType);
    newTaskList.add(task);
    this.saveTasks(type);
    this.saveTasks(newType);
  },
  removeTask: function(task){
    var modelType = task.toJSON().state
      , type = types[modelType]
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