define([
"jquery",
"backbone",
"view/contactListView",
"view/selectedContactView"
], 
function ($, Backbone, ContactListView, SelectedContactView) {


	var AppView = Backbone.View.extend({
		

		el: $('body'),


		initialize: function(){
			new ContactListView({model:this.model});
			new SelectedContactView({model:this.model});			
    	}

	});


	return AppView;

});