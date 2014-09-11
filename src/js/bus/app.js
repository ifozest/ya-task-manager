var Radio = require('radio')
  , TaskManagerController = require('./../taskManager/controller/taskManager')
  , TaskRepository = require('./../model/taskRepository');

var globalChannel = Radio.channel('global');

globalChannel.comply('show:taskManager', function (region) {
  console.log('bus show task manager');
  var taskManagerController = new TaskManagerController();
  taskManagerController.trigger('show:layout', region);

  var taskRepo = new TaskRepository();
});

module.exports = globalChannel;