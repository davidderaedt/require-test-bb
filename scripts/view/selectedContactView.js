define([
"jquery",
"underscore",
"backbone",
"model/Person"
], 
function ($, _, Backbone, Person) {


	var o=Backbone.View.extend({
		

		el: $('#selectedContact'),


		initialize: function() {
			
			this.model.bind("selectionChanged", this.onselectionchange, this);

      		// "manual" binding since the "events" object doesnt work for some buttons
      		$("#removeContactBt").on("click", null, this,  this.removeContactBtHandler);
      		$("#saveContactBt").on("click", null, this, this.saveContactBtHandler);

    	},

    	/*
    	events:{
    		"click #removeContactBt":"removeContactBtHandler",    		
    		"click #saveContactBt":"saveContactBtHandler",
    	},
    	*/

    	onselectionchange :function(){

    		this.contact =this.model.selection; 
    		console.log("selection changed to "+this.contact.get("firstname"));    		
    		this.render();
    	},  	


		removeContactBtHandler: function (evt){
			
			var view= evt.data;
			view.model.collec.remove(view.model.selection);
			view.model.setSelection(view.model.collec.at(0));
		},


		saveContactBtHandler:function (evt){
			
			var view= evt.data;
			var contactData={
				firstname:$("#firstnameInput").attr("value"), 
				lastname:$("#lastnameInput").attr("value")
			};

			view.model.updateSelection(contactData);
		},


		render:function(){

			var content="";

			content+="<h1>"+ this.contact.get("firstname")+" "+this.contact.get("lastname")+"</h1>";

			this.el.html(content);

			$("#contactIdInput").html(this.contact.id);

			$("#firstnameInput").attr("value", this.contact.get("firstname"));
			$("#lastnameInput").attr("value", this.contact.get("lastname"));

		}

	});

	return o;

});