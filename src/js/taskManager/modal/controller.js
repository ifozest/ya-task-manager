var Marionette = require('marionette')
  , ModalView = require('./modalView');

module.exports = Marionette.Controller.extend({
  initialize: function () {
    console.log('modal controller was created');
    this.view = new ModalView();
    this._initListenEvents();
  },
  showModal: function (region) {
    console.log(this.view);
//    console.log(region);
    region.show(this.view);
  },
  createTask: function (e) {
    console.log('createTask');
    console.log(e);

  },
  _initListenEvents: function () {
    this.listenTo(this.view, 'create:task', this.createTask);
//    this.listenTo(this.view, 'all', this.test);
  },
  test: function () {
    console.log(arguments);
  }

});