var Radio = require('radio')
  , TaskManagerController = require('./../taskManager/controller/taskManager')
  , TaskRepository = require('./../repository/localStorage');



var globalChannel = Radio.channel('global');

globalChannel.comply('show:taskManager', function (region) {
  console.log('bus show task manager');
  var taskManagerController = new TaskManagerController();
  taskManagerController.trigger('show:layout', region);

  var taskRepo = new TaskRepository();

  console.log(taskRepo);


});

module.exports = globalChannel;