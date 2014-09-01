var Backbone = require('backbone')
  , $ = require('jquery');
Backbone.$ = $; // fix
var Marionette = require('marionette');

var Layout = require('./taskManager/layout/layout');



var app = new Marionette.Application();

app.addRegions({
  mainRegion: '#container'
});

app.addInitializer(function () {
  console.log('i was started!');

  var layout = new Layout();
  this.mainRegion.show(layout);
});

app.start();


window.Marionette = Marionette;