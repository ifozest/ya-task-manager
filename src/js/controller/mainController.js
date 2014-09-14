var Marionette = require('marionette')
  , KanbanBoardController = require('./../kanbanBoard/kanbanController');


module.exports = Marionette.Controller.extend({
  renderKanbanBoard: function(region) {
    var boardController = new KanbanBoardController();
    boardController.renderKanbanBoard(region);
  }
});