define([
  'jquery',
  'underscore',
  'backbone',
  'model/Person'
], 

function($, _, Backbone, Person){


  var ContactListModel=  Backbone.Model.extend({
      

      initialize: function(){
        var o = Backbone.Collection.extend({model: Person});
        this.collec = new o;
        this.loadContactData();
      },


      setSelection:function(pContact){
        this.selection = pContact;
        this.trigger("selectionChanged");
      },


      updateSelection:function(pValues){
        this.selection.set(pValues);
        this.trigger("selectionUpdated");
        this.setSelection(this.selection);
      },
      

      loadContactData:function(){

        var self = this;
        $.getJSON("ContactData.json", function (data){

          $.each(data.items, function(index, item){
            // ugly, not sure how to better do that
            item.id = item.pid;
            self.collec.add(item);
          });

          console.log('All contacts loaded');

          self.setSelection(self.collec.at(0));

        });
      }

    });

  return ContactListModel;

});
