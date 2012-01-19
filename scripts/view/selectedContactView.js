define([
"jquery",
"backbone",
"model/Person"
], 
function ($, Backbone, Person) {


	var SelectedContactView = Backbone.View.extend({
		

		el: $('#selectedContact'),


		initialize: function() {
			
			this.model.bind("selectionChanged", this.onselectionchange, this);
    	},

    	
    	events:{
    		"click #removeContactBt":"removeContactBtHandler",    		
    		"click #saveContactBt":"saveContactBtHandler",
    	},
    	

    	onselectionchange :function(){

    		this.contact =this.model.selection; 
    		console.log("selection changed to "+this.contact.get("firstname"));    		
    		this.render();
    	},  	


		removeContactBtHandler: function (evt){
			
			this.model.collec.remove(this.model.selection);
			this.model.setSelection(this.model.collec.at(0));
		},


		saveContactBtHandler:function (evt){			
			
			var contactData={
				firstname:$("#firstnameInput").attr("value"), 
				lastname:$("#lastnameInput").attr("value")
			};

			this.model.updateSelection(contactData);
		},


		render:function(){

			$("#contactIdInput").html(this.contact.id);

			$("#firstnameInput").attr("value", this.contact.get("firstname"));
			$("#lastnameInput").attr("value", this.contact.get("lastname"));

		}

	});

	return SelectedContactView;

});