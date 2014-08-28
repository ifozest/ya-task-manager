var Backbone = require('backbone')
  , $ = require('jquery');
Backbone.$ = $; // fix
var Marionette = require('marionette');


var app = new Marionette.Application();

app.addInitializer(function () {
  console.log('i was started!');
});

app.start();
