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
  createTask: function(e) {
    this.trigger('create:task', e);
  },
  onDestroy: function() {
    console.log('destroy');  //Destroy ???
  },
  onHide: function() {
    this.ui.taskTitle.val('');
  }

});