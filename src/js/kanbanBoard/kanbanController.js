var Marionette = require('marionette')
  , LayoutController = require('./layout/controller');


module.exports = Marionette.Controller.extend({
  renderKanbanBoard: function(region){
    var layoutController = new LayoutController();
    this.listenTo(layoutController, 'layout:rendered', this.renderTasks);
    layoutController.renderLayout(region);
  },
  renderTasks: function(layout){
    console.log(layout);
  }



});