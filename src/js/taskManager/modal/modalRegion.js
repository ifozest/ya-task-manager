var Marionette = require('marionette');

//TODO check this

module.exports = Marionette.Region.extend({
  onShow: function() {
    this.$el.on('shown.bs.modal', function() {
      $(this).find('[autofocus]').focus();
    });
    this.$el.modal({show: true, backdrop: 'static'});

    this.show = function(){                          //TODO hell
      this.$el.modal({show: true, backdrop: 'static'});
    }
  }
});