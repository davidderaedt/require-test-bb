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
       // this.loadContactData();
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



/*
      loadContactData:function(){

        $.getJSON("ContactData.json", function (data){

          $.each(data.items, function(index, item){
            //var p = new Person(item.firstname, item.lastname, item.pid);
            //console.log("creating "+p.getFullName());
         console.log(o instanceof Backbone.Collection);

            o.add(item);
          });

          this.trigger("contactsLoaded");
          console.log('contactsLoaded');

          //o.selectContact(o.contactCollec[0]);

        });
      }
*/

  });

  return new o;
});
