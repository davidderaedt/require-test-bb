define([
"jquery",
"underscore",
"backbone",
"model/Person",
"model/contactCollec",
"view/contactListView",
"view/selectedContactView"
], 
function ($, _, Backbone, Person, contactCollec, contactListView, selectedContactView) {


	var o={};
 

 	o.init = function (){

	 	console.log("Contact app initializing");

	 	o.loadContactData();

 	};


	o.loadContactData=function(){

		$.getJSON("ContactData.json", function (data){

			$.each(data.items, function(index, item){
				// ugly, not sure how to better do that
				item.id = item.pid;
				contactCollec.add(item);
			});

			console.log('All contacts loaded');

			contactCollec.setSelection(contactCollec.at(0));

		});
	}; 	
 
	return o;

});