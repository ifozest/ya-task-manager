var Backbone = require('backbone');


module.exports = Backbone.Model.extend({
  defaults: {
    title: '',
    date: new Date()
  }
});