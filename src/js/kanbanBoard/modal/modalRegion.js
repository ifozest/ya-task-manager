var Marionette = require('marionette')
  , $ = require('jquery');

//On first show overwrites show method
//maybe pass that into view???

module.exports = Marionette.Region.extend({
  onShow: function() {
    this._handleBsEvents();
    this.showModal();
    this.show = function() {
      this.showModal();
    };
  },
  closeView: function() {
    this.$el.modal('hide');
  },
  showModal: function() {
    this.$el.modal({show: true, backdrop: 'static'});
  },
  _handleBsEvents: function() {
    this.$el.on('shown.bs.modal', function() {
      $(this).find('[autofocus]').focus();
    });
    var self = this;
    this.$el.on('hidden.bs.modal', function() {
      self.currentView.trigger('modal:hide');
    });
  }
});