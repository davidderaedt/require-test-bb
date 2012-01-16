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
					
      		contactCollec.bind('add', this.addContact, this);
      		contactCollec.bind('remove', this.removeContact, this);   
      		contactCollec.bind('selectionChanged', this.onModelSelectionChanged, this);         		
      		contactCollec.bind('selectionUpdated', this.render, this);   
      		   		
      		// "manual" binding since the "events" object doesnt work for some buttons
      		$("#createContactBt").bind('click', this.createContactBtClickHandler);         		
      		$(".contactitem").live('click', this.onUISelect);   
 
    	},


		render:function(){

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

			var elt = $('[data-contactid="'+contact.id+'"]');
			$(elt).parent().remove();
		},  	   


	    onUISelect:function(evt){  
	    	console.log("onUISelect");
	    	var elt = $(evt.target);

			var contactId = elt.attr("data-contactid");
			console.log(contactId);

			var contact = contactCollec.get(contactId);
			contactCollec.setSelection(contact);

			console.log(contact.get("firstname")+ ' selected');	 

	    },


	    onModelSelectionChanged:function(){
	    	
	    	var elt = $('[data-contactid="'+contactCollec.selection.id+'"]');
			$(".selection").removeClass("selection");
			elt.addClass("selection");	 
	    },


		createContactBtClickHandler:function (evt){

			var c={firstname:"f", lastname:"l", id:Math.floor(Math.random()*0xFFFFFF)};
			contactCollec.add(c);
			contactCollec.setSelection(contactCollec.at(contactCollec.length-1));

		}


	});


	return new o;

});