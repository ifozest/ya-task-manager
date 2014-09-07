var Radio = require('radio')
  , TaskManagerController = require('./../taskManager/controller/taskManager');


var globalChannel = Radio.channel('global');

globalChannel.comply('show:taskManager', function (region) {
  console.log('bus show task manager');
  var taskManagerController = new TaskManagerController();
  taskManagerController.trigger('show:layout', region);
});

module.exports = globalChannel;