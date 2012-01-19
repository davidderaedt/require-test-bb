define([
"jquery",
"underscore",
"backbone",
"model/Person",
"model/contactListModel",
"view/contactListView",
"view/selectedContactView"
], 
function ($, _, Backbone, Person, ContactListModel, ContactListView, SelectedContactView) {


	var o={};
 

 	o.init = function (){

		console.log("Contact app initializing");

		var model = new ContactListModel();
		
		new ContactListView({model:model});
		new SelectedContactView({model:model});

 	};

	return o;

});