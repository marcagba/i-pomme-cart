/**
* Route the application
* @module Router
*/
define([
	'jquery',
	'backbone'
], function ($, Backbone) {
	'use strict';

	var exports = Backbone.Router.extend({
		
		/** list of the page url redirections */
		routes: {
			'search/:query': 'search',
			'add2Cart/:id': 'add2Cart',
		},

		/** A the creation, we bound the  search collection to the router */
		initialize: function initialize(options) {
			this.searchColl = options.searchColl;
			this.cartColl = options.cartColl;
		},

		/** perform a search throug Itunes API without refreshing the page */
		search: function search(query) {
			this.searchColl.query = query;
			this.searchColl.fetch({
				url: this.searchColl.url(),
				dataType: 'jsonp', // >.< damn jsonp !
				reset: true
			});
		},

		/** add an item to the cart */
		add2Cart: function add2Cart(id) {
			var item = this.searchColl.get(id);
			this.cartColl.add(item);
		}

	});

	return exports;
});