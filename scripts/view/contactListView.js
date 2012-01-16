define([
"jquery",
"underscore",
"backbone",
"model/contactCollec"
], 
function ($, _, Backbone, contactCollec) {


	var o= Backbone.View.extend({
		
		el: $('#contacts'),


		initialize: function() {

			console.log("contact list init");
					
      		contactCollec.bind('add', this.addContact, this);
      		contactCollec.bind('remove', this.removeContact, this);   
      		contactCollec.bind('selectionChanged', this.onModelSelectionChanged, this);         		
      		contactCollec.bind('selectionUpdated', this.render, this);   
      		   		
      		// "manual" binding since the "events" object doesnt work for this button
      		$("#createContactBt").bind('click', this.createContactBtClickHandler);   
 
    	},


		render:function(){

			console.log("rendering "+contactCollec.length);
			this.el.html("");

			var n = contactCollec.length;

			for (var i = 0; i < n; i++) {
				var contact = contactCollec.at(i);
				this.addContact(contact);
			};
		

		},


		addContact:function(contact){

			var contactElt = $(document.createElement('li'));
	 		contactElt.html('<li class="contactitem" data-contactid="'+contact.id+'">'+contact.get("firstname")+" "+contact.get("lastname")+"</li>");

	 		this.el.append(contactElt);

		},


		removeContact:function(contact){
			console.log('removing from list');
			var elt = $('[data-contactid="'+contact.id+'"]');
			$(elt).parent().remove();
		},



	    events: {
	      "click #createContactBt":"createContactBtClickHandler", 	      	      
	      "click .contactitem":"onUISelect"
	    },    	   


	    onUISelect:function(evt){  

	    	var elt = $(evt.target);

			var contactId = elt.attr("data-contactid");
			console.log(contactId);

			var contact = contactCollec.get(contactId);
			contactCollec.setSelection(contact);

			console.log(contact.get("firstname")+ ' selected');	 

	    },


	    onModelSelectionChanged:function(){
	    	
	    	console.log("onModelSelectionChanged");
	    	var elt = $('[data-contactid="'+contactCollec.selection.id+'"]');
			$(".selection").removeClass("selection");
			elt.addClass("selection");	 
	    },


		createContactBtClickHandler:function (evt){

			console.log('create clicked');
			var c={firstname:"f", lastname:"l", id:Math.floor(Math.random()*0xFFFFFF)};
			contactCollec.add(c);
			contactCollec.setSelection(contactCollec.at(contactCollec.length-1));
			//this.trigger("createContact");

		}




	});

/*
	o.el = $("#contacts");
	o.contactCollect={};
	o.selectedContact={};

	o.initialize= function (){

		console.log("contact list init");

		$("#createContactBt").on("click", createContactBtClickHandler);

	}

	function createContactBtClickHandler(){

		o.trigger("createContact");

	}

	o.setContactCollec=function (pCollec){

		o.contactCollect = pCollec;

		o.render();

	}

	o.removeContact=function(pContact){

		var elt = $('[data-contactid="'+pContact.id+'"]');
		$(elt).parent().remove();

	}

	o.render=function(){

		o.el.html("");
		
		$.each(o.contactCollect, function(index, contact){
			console.log(contact.getFullName());
 			o.addContact(contact);

 		});

	}

	o.addContact=function(contact){

		var contactElt = $(document.createElement('li'));
 		contactElt.html('<li data-contactid="'+contact.id+'">'+contact.getFullName()+"</li>");

 		o.el.append(contactElt);

 		$(contactElt).on("click", function(){
 			o.setSelection(contact, true);
 		});		

 		o.setSelection(contact, false);
	}



	o.setSelection=function (pContact, fromUI){

		o.selectedContact = pContact;
		var elt = $('[data-contactid="'+pContact.id+'"]');

		$(".selection").removeClass("selection");
		elt.addClass("selection");

		if(fromUI==true) o.trigger("contactSelected");

	}
 */

	return new o;

});