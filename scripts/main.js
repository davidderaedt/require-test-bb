require.config({
  paths: {

    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    text: 'libs/require/text',
    templates: '../templates'
  }

});


require([
"model/contactListModel",
"view/AppView"
], 

function(ContactListModel, AppView) {

	console.log("Contact app initializing");

	var model = new ContactListModel();

	var mainView = new AppView({model:model});

});