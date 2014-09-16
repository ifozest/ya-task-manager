var Handlebars = require('handlebars')['default'];

Handlebars.registerHelper('isProgressive', function(object, options){
  if(object.state < 2){
    return options.fn(this);
  }
});

Handlebars.registerHelper('isRegressive', function(object, options){
  if(object.state > 0){
    return options.fn(this);
  }
});

//module.exports = Handlebars;