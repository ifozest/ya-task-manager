var Backbone = require('backbone')
  , Radio = require('radio')
  , _ = require('underscore')
  , Layout = require('./../layout/layout')
  , modalController = require('./../modal/controller');

//TODO !!!!! refactor this shit!!!
var TaskList = require('./../../model/task/taskList');

var ModalView = require('./../modal/modalView');

var controller = _.extend({}, Radio.Commands, Backbone.Events, {
  renderTasks: function (layout) {
    console.log(layout);
//    console.log(new TaskList(stub));
  },
  showModal: function (region) {
    modalController.showModal(region);

  }
});

controller.comply('show', function (region) {
  console.log('task manager');
  var layout = new Layout();
  this.listenToOnce(layout, 'layout:rendered', this.renderTasks);
  this.listenTo(layout, 'button:create:task', this.showModal);
  region.show(layout);
});


module.exports = controller;