var Radio = require('radio')
  , taskManagerController = require('./../taskManager/controller/taskManager');


var globalChannel = Radio.channel('global');

globalChannel.comply('show:taskManager', function (region) {
  console.log('bus show task manager');
  taskManagerController.command('show', region);
});

module.exports = globalChannel;