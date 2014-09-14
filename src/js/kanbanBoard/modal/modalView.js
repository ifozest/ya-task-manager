var Marionette = require('marionette')
  , template = require('./template/modal');


module.exports = Marionette.ItemView.extend({
  initialize: function() {
    this.on('modal:hide', this.onHide);
  },
  tagName: 'div',
  className: 'modal-dialog',
  template: template,
  ui: {
    taskTitle: '#taskTitle',
    successBtn: '.btn-success'
  },
  events: {
    'click @ui.successBtn': 'createTask'
  },
  createTask: function() {
    var taskTitle = this.ui.taskTitle.val();
    this.trigger('btn:clicked:create:task', taskTitle);
  },
  onDestroy: function() {
    console.log('destroy');  //Destroy ???
  },
  onHide: function() {
    this.ui.taskTitle.val('');
  }

});