var Backbone = require('backbone')
  , $ = require('jquery');

Backbone.$ = $; // fix
var Marionette = require('marionette')
  , Radio = require('radio')
  , _ = require('underscore')
  , globalChannel = require('./bus/app');


//extract this!
_.extend(Marionette.Controller.prototype, Radio.Commands, Radio.Requests);

var app = new Marionette.Application();

app.addRegions({
  mainRegion: '#container'
});

app.addInitializer(function() {
  console.log('i was started!');
  globalChannel.command('show:taskManager', this.mainRegion);
});

app.start();
module.exports = app;

window.jQuery = $;
window.$ = $;
