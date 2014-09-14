var Marionette = require('marionette')
  , Layout = require('./layout');


module.exports = Marionette.Controller.extend({
  renderLayout: function(region){
    var layout = new Layout();
    this.listenTo(layout, 'layout:rendered', this.layoutRendered);
    region.show(layout);
  },
  layoutRendered: function(layout){
    this.trigger('layout:rendered', layout);
  }
});