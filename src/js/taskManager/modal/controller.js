var Marionette = require('marionette')
  , ModalView = require('./modalView');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.region = options.region;
    this.view = new ModalView();
    this._initListenEvents();
  },
  showModal: function () {
    this.region.show(this.view);
  },
  createNewTask: function (value) {
    console.log(value);
    this.region.closeView();
  },
  _initListenEvents: function () {
    this.listenTo(this.view, 'create:task', this.createNewTask);
  }

});