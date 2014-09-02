var Marionette = require('marionette')
  , template = require('./template/task');


module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: template
});