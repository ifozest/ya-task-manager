var Marionette = require('marionette')
  , SectionView = require('./taskList');


module.exports = Marionette.Controller.extend({
  renderSection: function(region, collection){
    var view = new SectionView({collection: collection});
    this.listenTo(view, 'childview:remove:task', this.removeTask);
    region.show(view);
  },
  removeTask: function(view){
    var model = view.model;
    console.log(model);
    this.trigger('remove:task', model);
  }
});