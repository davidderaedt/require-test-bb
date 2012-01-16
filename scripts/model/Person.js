define([
'underscore', 
'backbone'
], 
function(_, Backbone) {

  var o = Backbone.Model.extend({

    // Default attributes 
    defaults: {
    	id:0,
      firstname: "firstname",
      lastname: "lastname"      
    },

    // A dummy initialization method
    initialize: function() {
      //TODO
    }

  });
  return o;
});

