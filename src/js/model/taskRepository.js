var Marionette = require('marionette')
  , TaskList = require('./task/taskList')
  , Task = require('./task/task')
  , _ = require('underscore')
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
    this._initTasks();
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
    return this;
  },
  getTasks: function(){
    return this.tasks;
  },
  createNewTask: function(title) {
    var newTask = new Task({title: title, id: guid()});
    this.tasks.todo.add(newTask);
    this.saveTasks('todo');
    return newTask;
  },
  process: function(task, action){
    var states = ['todo', 'doing', 'done']
      , leaveOnPage = (action !== 'remove')
      , modelState = task.toJSON().state
      , collectionState = states[modelState]
      , currentTaskList = this.tasks[collectionState]
      , newModelState
      , newCollectionState
      , newTaskList;

    if (leaveOnPage) {
      if (action === 'progress') {
        newModelState = modelState + 1;
        if (newModelState > (states.length - 1)) {
          return;
        }
      } else if (action === 'regress') {
        newModelState = modelState - 1;
        if (newModelState < 0) {
          return;
        }
      }
      newCollectionState = states[newModelState];
      newTaskList = this.tasks[newCollectionState];
    }
    currentTaskList.remove(task);
    if (leaveOnPage) {
      task.set('state', newModelState);
      newTaskList.add(task);
      this.saveTasks(newCollectionState);
    }
    this.saveTasks(collectionState);
  },
  _initTasks: function() {
    this.tasks = {};
    this.tasks.todo = new TaskList(this.fetchTasks('todo'));
    this.tasks.doing = new TaskList(this.fetchTasks('doing'));
    this.tasks.done = new TaskList(this.fetchTasks('done'));
  }
});

module.exports = new TaskRepository();