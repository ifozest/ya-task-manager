var Marionette = require('marionette')
  , ModalView = require('./modalView');

module.exports = Marionette.Controller.extend({
  initialize: function(options) {
    this.region = options.region;
    this.view = new ModalView();
    this._initListenEvents();
  },
  showModal: function() {
    this.region.show(this.view);
  },
  createNewTask: function(value) {  //Validate this! properly
    var title = value.trim();
    if (this._isValid(title)){
      this.trigger('create:task', title);
      this.region.closeView();
    } else {
      alert('wrong!');
    }
  },
  _initListenEvents: function() {
    this.listenTo(this.view, 'btn:clicked:create:task', this.createNewTask);
  },
  _isValid: function(value) {
    return !!((value.length > 0 && value.length < 100));
  }
});