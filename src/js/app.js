var Backbone = require('backbone')
  , $ = require('jquery');

Backbone.$ = $; // fix
var Marionette = require('marionette');


var app = new Marionette.Application();

app.addRegions({
  mainRegion: '#container'
});

app.addInitializer(function() {
  console.log('i was started!');
});

app.start();
module.exports = app;

window.jQuery = $;
window.$ = $;
Radio.DEBUG = true;
