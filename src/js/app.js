var Backbone = require('backbone')
  , $ = require('jquery');
Backbone.$ = $; // fix
var Marionette = require('marionette')
  , globalChannel = require('./bus/app');

var app = new Marionette.Application();

app.addRegions({
  mainRegion: '#container'
});

app.addInitializer(function () {
  console.log('i was started!');
  globalChannel.command('show:taskManager', this.mainRegion);
});

app.start();
module.exports = app;
