define([
  'jquery',
  'underscore',
  'backbone',
  'model/Person'
], 

function($, _, Backbone, Person){

    var o = Backbone.Collection.extend({

      model: Person,

      initialize: function(){    
       //
      },

      setSelection:function(pContact){
        this.selection = pContact;
        this.trigger("selectionChanged");
      },


      updateSelection:function(pValues){
        this.selection.set(pValues);
        this.trigger("selectionUpdated");
        this.setSelection(this.selection);
      }


  });

  return new o;
});
