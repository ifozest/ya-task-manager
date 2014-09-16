var Marionette = require('marionette')
  , SectionView = require('./taskList');


module.exports = Marionette.Controller.extend({
  renderSection: function(region, collection){
    var view = new SectionView({collection: collection});
    this.listenTo(view, 'childview:remove:task', this.removeTask);
    this.listenTo(view, 'childview:progress:task', this.progressTask);
    this.listenTo(view, 'childview:regress:task', this.regressTask);
    region.show(view);
  },
  removeTask: function(view){
    var model = view.model;
    this.trigger('remove:task', model);
  },
  progressTask: function(view){
    var model = view.model;
    this.trigger('progress:task', model);
  },
  regressTask: function(view){
    var model = view.model;
    this.trigger('regress:task', model);
  }
});