var Marionette = require('marionette')
  , ModalView = require('./modalView');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.region = options.region;
    this.view = new ModalView();
    this._initListenEvents();
  },
  showModal: function () {
    console.log(this.view);
    this.region.show(this.view);
  },
  createNewTask: function (e) {
    console.log('createTask');
    this.region.closeView();
  },
  _initListenEvents: function () {
    this.listenTo(this.view, 'create:task', this.createNewTask);
  }

});