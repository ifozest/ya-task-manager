var Marionette = require('marionette')
  , template = require('./template/modal')
  , controller = require('./controller');


module.exports = Marionette.ItemView.extend({
  initialize: function(){
    this.controller = controller;
  },

  tagName: 'div',
  className: 'modal-dialog',
  template: template,
  ui: {
    taskTitle: '#taskTitle',
    successBtn: '.btn-success'
  },
  events: {
    'click @ui.successBtn' : 'createTask'
  },
  createTask: function(e){
    console.log(require('./controller'));
    console.log(controller);
    this.controller.createTask();

  }
});