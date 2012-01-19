define([
"jquery",
"backbone"
], 
function ($, Backbone) {


	var ContactListView = Backbone.View.extend({
		

		el: $('#contactPanel'),


		initialize: function(){
					
      		this.model.collec.bind('add', this.addContact, this);
      		this.model.collec.bind('remove', this.removeContact, this);   
      		this.model.bind('selectionChanged', this.onModelSelectionChanged, this);         		
      		this.model.bind('selectionUpdated', this.render, this);   		 
    	},


		render:function(){

			var ul = this.el.find("ul");
			ul.html("");

			var n = this.model.collec.length;

			for (var i = 0; i < n; i++) {
				var contact = this.model.collec.at(i);
				this.addContact(contact);
			};
		},


		events:{
			"click .contactitem":"onUISelect",	
			"click #createContactBt":"createContactBtClickHandler",	
		},


		addContact:function(contact){

			var contactElt = $(document.createElement('li'));
	 		contactElt.html('<li class="contactitem" data-contactid="'+contact.id+'">'+contact.get("firstname")+" "+contact.get("lastname")+"</li>");

	 		var ul = this.el.find("ul");
	 		ul.append(contactElt);

		},


		removeContact:function(contact){

			var elt = $('[data-contactid="'+contact.id+'"]');
			$(elt).parent().remove();
		},  	   


	    onUISelect:function(evt){  
	 	    	
	    	var elt = $(evt.target);

			var contactId = elt.attr("data-contactid");
			var contact = this.model.collec.get(contactId);

			this.model.setSelection(contact);			

	    },


	    onModelSelectionChanged:function(){
	    	
	    	var elt = $('[data-contactid="'+this.model.selection.id+'"]');
			$(".selection").removeClass("selection");
			elt.addClass("selection");	 
	    },


		createContactBtClickHandler:function (evt){

			var c={firstname:"f", lastname:"l", id:Math.floor(Math.random()*0xFFFFFF)};
			this.model.collec.add(c);
			this.model.setSelection(this.model.collec.at(this.model.collec.length-1));

		}


	});


	return ContactListView;

});