var Marionette = require('marionette')
  , Layout = require('./../layout/layout')
  , ModalController = require('./../modal/controller');



module.exports = Marionette.Controller.extend({
  initialize: function(){
    this.on('show:layout', this.showLayout);
  },
  showLayout: function(region){       //TODO hell
    var layout = new Layout();
    this.listenToOnce(layout, 'layout:rendered', this.renderTasks);
    this.listenTo(layout, 'layout:show:modal', this.showModal);
    region.show(layout);
  },
  renderTasks: function (layout) {
    console.log('render tasks');
  },
  showModal: function (region) {
    console.log(region.$el);
    this.listenTo(region, 'all', function () {
      console.log(arguments);

    });



//    console.log(this.modalController);
    this.modalController = this.modalController || new ModalController();
//    console.log(this.modalController);
    this.modalController.showModal(region);
  }
});