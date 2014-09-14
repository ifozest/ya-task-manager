var Marionette = require('marionette')
  , tasksRepository = require('./../model/taskRepository')
  , ModalController = require('./modal/controller')
  , LayoutController = require('./layout/controller');


var TaskListView = require('./view/taskList');

module.exports = Marionette.Controller.extend({
  renderKanbanBoard: function(region){
    var layoutController = new LayoutController();
    this.listenTo(layoutController, 'layout:rendered', this.renderTasks);
    this.listenTo(layoutController, 'layout:show:modal', this.showModal);
    layoutController.renderLayout(region);
  },
  renderTasks: function(layout){
    var tasks = tasksRepository.getTasks();
    console.log(tasks);
    for (var taskList in tasks){
      console.log(tasks[taskList]);
      var taskListView = new TaskListView({collection: tasks[taskList]});
      layout[taskList].show(taskListView);

    }

  },
  renderSection: function(){

  },
  showModal: function(region){
    var modalController = new ModalController({region:region});
    this.listenTo(modalController, 'create:task', this.createTask);
    modalController.showModal(region);
  },
  createTask: function(title){
    tasksRepository.createNewTask(title);
  }
});