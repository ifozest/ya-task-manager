var Marionette = require('marionette')
  , Layout = require('./../layout/layout')
  , ModalController = require('./../modal/controller');

var bus = require('./../../bus/app');


module.exports = Marionette.Controller.extend({
  initialize: function() {
    this.on('show:layout', this.showLayout);
  },
  showLayout: function(region) {
    var layout = new Layout();
    this.layout = layout;
    this.listenToOnce(layout, 'layout:render:tasks', this.renderTasks);
    this.listenTo(layout, 'layout:show:modal', this.showModal);
    region.show(layout);
  },
  renderTasks: function() {
    //get taskLists!!!
    console.log(require('./../../bus/app'));
    console.log(bus);

    console.log('render tasks');
  },
  showModal: function() {
    this.modalController = this.modalController || new ModalController({region: this.layout.modal});
    this.modalController.showModal();
  }
});