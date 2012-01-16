define([
"jquery",
"underscore",
"backbone",
"model/Person",
"model/contactCollec"
], 
function ($, _, Backbone, Person, contactCollec) {


	var o=Backbone.View.extend({
		

		el: $('#selectedContact'),


		initialize: function() {
			
			contactCollec.bind("selectionChanged", this.onselectionchange, this);

      		// "manual" binding since the "events" object doesnt work for some buttons
      		$("#removeContactBt").bind("click", this.removeContactBtHandler);
      		$("#saveContactBt").bind("click", this.saveContactBtHandler);

    	},


    	onselectionchange :function(){

    		this.contact =contactCollec.selection; 
    		console.log("selection change");
    		this.render();
    	},  	


		removeContactBtHandler: function (){

			contactCollec.remove(contactCollec.selection);
			contactCollec.setSelection(contactCollec.at(0));
		},


		saveContactBtHandler:function (){
			
			var contactData={
				firstname:$("#firstnameInput").attr("value"), 
				lastname:$("#lastnameInput").attr("value")
			};

			contactCollec.updateSelection(contactData);
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

	return new o;

});