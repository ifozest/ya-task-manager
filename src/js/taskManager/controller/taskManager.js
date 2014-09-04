var Backbone = require('backbone')
  , $ = require('jquery')
  , Radio = require('radio')
  , _ = require('underscore')
  , Layout = require('./../layout/layout');

var TaskList = require('./../../model/task/taskList');


var controller = _.extend({}, Radio.Commands, Backbone.Events, {
  renderTasks: function (layout) {
    console.log(layout.regions);
//    console.log(new TaskList(stub));
  },
  createTask: function(){
    $('#myModal').modal();
  }
});

controller.comply('show', function (region) {
  console.log('task manager');
  var layout = new Layout();
  this.listenToOnce(layout, 'layout:rendered', this.renderTasks);
  this.listenTo(layout, 'button:create:task', this.createTask);
  region.show(layout);
});


module.exports = controller;