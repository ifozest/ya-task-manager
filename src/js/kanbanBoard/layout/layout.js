var Marionette = require('marionette')
  , ModalRegion = require('./../modal/modalRegion')
  , template = require('./template/template');

module.exports = Marionette.LayoutView.extend({
  template: template,
  regions: {
    todo: '#todo',
    doing: '#doing',
    done: '#done',
    modal: {
      selector: '#modal',
      regionClass: ModalRegion
    }
  },
  ui: {
    button: '#createTask'
  },
  events: {
    'click @ui.button': 'pressButton'
  },
  pressButton: function() {
    this.trigger('layout:show:modal', this.modal);
  },
  onShow: function() {
    this.trigger('layout:rendered', this);
  }
});