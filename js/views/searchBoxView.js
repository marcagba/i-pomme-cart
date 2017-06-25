/**
* The logic behind the search bar
* @module SearchBoxView
*/
define([
	'backbone',
 	'jquery',
 	'underscore',
 	'handlebars',
 	'text!templates/search-box.html'
 ], function (Backbone, $, _, Handlebars, searchBoxTemplate) {
	'use-strict';

	var exports = Backbone.View.extend({
		
		className: 'SearchBoxWrapper',

		template: Handlebars.compile(searchBoxTemplate),

		/** needs an action to perform when a saerch is fire, and a router */
		initialize: function initialize(options) {
			this.action = options && options.action || '';
			this.router = options && options.router || '';
			console.log(this.action);
		},

		render: function render() {
			var searchBoxTmpl = this.template({ action: this.action });
			this.$el.html(searchBoxTmpl);
			return this;
		},

		
		events: {
			'submit': 'submit'
		},

		/** we redirect submit to perform a search without refreshing the page */
		submit: function submit(e) {
			e.preventDefault();
			e.stopPropagation();
			
    		var query = this.$('.SearchBox-field').val();
    		if (query) {
            	this.router.navigate('search/' + query, true);
        	}
		}


	});

	return exports;
});