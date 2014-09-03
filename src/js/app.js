var Backbone = require('backbone')
  , $ = require('jquery');
Backbone.$ = $; // fix
var Marionette = require('marionette')
  , globalChannel = require('./bus/app');


//trash
var Layout = require('./taskManager/layout/layout');
var Task = require('./model/task/task');
var TasksList = require('./model/task/taskList');
var TaskView = require('./taskManager/view/taskList');


var app = new Marionette.Application();

globalChannel.listenTo(app, 'all', function () {
    console.log(arguments);
  }
);


app.addRegions({
  mainRegion: '#container'
});

app.addInitializer(function () {
  console.log('i was started!');

  var layout = new Layout();
  this.mainRegion.show(layout);

  //trash
  var task = new Task({title: 'lol'});
  var task2 = new Task({title: 'lol2'});
  var task3 = new Task({title: 'lol3'});
  var tasks = new TasksList([task, task2, task3]);
  var taskView = new TaskView({collection: tasks});

  layout.awaitingTasks.show(taskView);
});

app.start();

module.exports = app;

window.Marionette = Marionette;
window.app = app;