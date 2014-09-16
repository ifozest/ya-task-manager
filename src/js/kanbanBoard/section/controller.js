var Marionette = require('marionette')
  , SectionView = require('./taskList');


module.exports = Marionette.Controller.extend({
  renderSection: function(region, collection){
    var view = new SectionView({collection: collection});
    this.listenTo(view, 'childview:task:action', this.taskAction);
    region.show(view);
  },
  taskAction: function(view, action){
    var model = view.model;
    this.trigger('task:action', model, action);
  }
});