var Backbone = require('backbone')
  , Radio = require('radio')
  , _ = require('underscore')
  , ModalView = require('./modalView');


var controller = _.extend({}, Backbone.Events, Radio.Commands, {
  showModal: function(region){
    var view = new ModalView();
    region.show(view);
  },
  createTask: function(){
    console.log(arguments);
  }
});



module.exports = controller;