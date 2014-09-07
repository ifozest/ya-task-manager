var Marionette = require('marionette')
  , $ = require('jquery');

//On first show overwrites show method

module.exports = Marionette.Region.extend({
  onShow: function() {
    this.$el.on('shown.bs.modal', function() {
      $(this).find('[autofocus]').focus();
    });
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
  }

});