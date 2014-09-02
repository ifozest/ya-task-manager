var Marionette = require('marionette')
  , TaskView = require('./singleTask');


module.exports = Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: TaskView
});
