var Marionette = require('marionette');

//TODO check this

module.exports = Marionette.Region.extend({
  constructor: function() {
    Marionette.Region.prototype.constructor.apply(this, arguments);

//    this.$el.on('hidden', {region:this}, function(event) {
//      event.data.region.close();
//    });
  },
  onShow: function() {
    this.$el.on('shown.bs.modal', function() {
      $(this).find('[autofocus]').focus();
    });
    this.$el.modal({show: true, backdrop: 'static'});
  },
  onClose: function() {
    this.$el.modal('hide');
  }
});