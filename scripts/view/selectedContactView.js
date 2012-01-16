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
			console.log("selectedcontact view init");
			contactCollec.bind("selectionChanged", this.onselectionchange, this);

      		// "manual" binding since the "events" object doesnt work for this button
      		$("#removeContactBt").bind("click", this.removeContactBtHandler);
      		$("#saveContactBt").bind("click", this.saveContactBtHandler);

    	},


    	onselectionchange :function(){
    		this.contact =contactCollec.selection; 
    		console.log("selection change");
    		this.render();
    	},

	    events: {
	      "click #removeContactBt"  : "removeContactBtHandler",
	      "click #saveContactBt"    : "saveContactBtHandler"
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

/*	
	o.el = $("#selectedContact");


	contact={};


	o.init = function(){
		$("#removeContactBt").on("click", removeContactBtHandler);
		$("#saveContactBt").on("click", saveContactBtHandler);		
	}


	function removeContactBtHandler(){
		o.trigger("removeContact");	
	};

	function saveContactBtHandler(){
		var contactData={
			firstname:$("#firstnameInput").attr("value"), 
			lastname:$("#lastnameInput").attr("value")
		};
		o.trigger("saveContact", contactData);			
	}

	o.setContact = function (pContact){
		contact = pContact;
		o.render();
	};

	o.getContact = function (){
		return contact;
	};


	o.render=function(){

		var content="";

		content+="<h1>"+ contact.getFullName()+"</h1>";

		o.el.html(content);

		$("#contactIdInput").html(contact.id);

		$("#firstnameInput").attr("value", contact.firstname);
		$("#lastnameInput").attr("value", contact.lastname);

	}

	o.init();
*/ 
	return new o;

});