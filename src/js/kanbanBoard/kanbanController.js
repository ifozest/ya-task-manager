var Marionette = require('marionette')
  , tasksRepository = require('./../model/taskRepository')
  , SectionController = require('./section/controller')
  , ModalController = require('./modal/controller')
  , LayoutController = require('./layout/controller');

module.exports = Marionette.Controller.extend({
  renderKanbanBoard: function(region){
    var layoutController = new LayoutController();
    this.listenTo(layoutController, 'layout:rendered', this.renderTasks);
    this.listenTo(layoutController, 'layout:show:modal', this.showModal);
    layoutController.renderLayout(region);
  },
  renderTasks: function(layout){
    var tasks = tasksRepository.getTasks();
    for (var taskList in tasks){
      var sectionController = new SectionController();
      sectionController.renderSection(layout[taskList], tasks[taskList]);
      this.listenTo(sectionController, 'remove:task', this.removeTask);
      this.listenTo(sectionController, 'progress:task', this.progressTask);
      this.listenTo(sectionController, 'regress:task', this.regressTask);
    }
  },
  renderSection: function(){

  },
  showModal: function(region){
    var modalController = new ModalController({region: region});
    this.listenTo(modalController, 'create:task', this.createTask);
    modalController.showModal();
  },
  progressTask: function(task){
    tasksRepository.progressTask(task);
  },
  regressTask: function(task){
    tasksRepository.regressTask(task);
  },
  createTask: function(title){
    tasksRepository.createNewTask(title);
  },
  removeTask: function(task){
    tasksRepository.removeTask(task);
  }
});