var Backbone = require('backbone')
  , $ = require('jquery');

Backbone.$ = $; // fix
var Marionette = require('marionette')
  , MainController = require('./controller/mainController');
require('./utils/handlebarsHelpers');

var app = new Marionette.Application();

app.addRegions({
  mainRegion: '#container'
});

app.addInitializer(function() {
  console.log('i was started!');
  var controller = new MainController();
  controller.renderKanbanBoard(this.mainRegion);
});

app.start();
module.exports = app;

window.jQuery = $;
window.$ = $;
