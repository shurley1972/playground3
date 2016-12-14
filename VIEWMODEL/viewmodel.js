// Recommended AMD module pattern for a Knockout component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define([ 'text!viewmodel.html'], function( htmlString) {
	/**
	 * CONSTRUCTOR
	 */
	function viewModel(params) {
		/** 
		 * SAMPLE CODE BELOW IS FOR LEARNING PURPOSE
		 */
		var self = this;
		// 1. auto-injected observables by form runtime 
		this.myreadonly = ko.observable().extend({form: "readonly"});
		//console.log('Form is ReadOnly = ' + this.myreadonly());
	    //console.log('Form is ReadOnly = ' + this.$formReadOnly());			// auto-injected: viewModel.prototype.$formReadOnly = ko.pureComputed(...);
		this.mydesignmode = ko.observable().extend({form: "designmode"});
	    //console.log('Form is in Design Mode = ' + this.mydesignmode());	// auto-injected: viewModel.prototype.$formDesignMode = ko.pureComputed(...);
	    //console.log('Form is in Design Mode = ' + this.$formDesignMode());	// auto-injected: viewModel.prototype.$formDesignMode = ko.pureComputed(...);

	    // 2. auto-injected observable linked to SharePoint item 'Title' column, placed on your form by textbox component 
		//try {
	    //    console.log('SharePoint column "Title", value = ' + this.Title());	// auto-injected: viewModel.prototype.Title = ko.observable();		
		    // ... check your model for more SharePoint-linked observables named as column's Internal Name, if there are more components placed on form. 
		//}
	    //catch (e) { };

		this.myruntime = ko.observable().extend({form: "runtime"});
		//console.log('Runtime = ' + this.myruntime());
		this.myruntime_listName = ko.observable(this.myruntime()._formListName);
		this.myruntime_listTitle = ko.observable(this.myruntime()._formListTitle);


		this.myviewmodel = ko.observable().extend({form: "viewmodel"});
		//console.log('ViewModel = ' + this.myviewmodel());


        // 3. code-creatd observable linked to SharePoint item 'Title' column
		this.mytitle = ko.observable().extend({ listItem: "Title" });
	    //console.log('MyTitle = ' + this.mytitle());	// auto-injected: viewModel.prototype.$formDesignMode = ko.pureComputed(...);
	    //this.mytitle.subscribe(function(newValue){
	    //    console.log('1. subscription MyTitle = ' + newValue);
	    //    console.log('2. subscription Title = ' + self.Title());
	    //});
		
		// 4. form permissions check
		this.myuserpermissions = ko.observable().extend({form: "userpermissions"});
		//console.log("Can edit list items: " + this.myuserpermissions().has(SP.PermissionKind.editListItems));
		this.canEdit = this.$userpermissions.has(SP.PermissionKind.editListItems);
		//console.log("Can edit list items: " + this.canEdit);

		/**
		 * EDIT MODEL BELOW TO DESIGN YOUR CUSTOM SPA FORM
		 */
		this.attachmentRequired = ko.observable(false);
				
	}
    // Use prototype to declare any public methods
    //viewModel.prototype.doSomething = function() { ... };
	//viewModel.prototype.MyButtonClick = function () {
	//	var model = this;
	//	debugger;
	//};

 
    // Return model definition
	return { viewModel: viewModel, template: htmlString };
});
