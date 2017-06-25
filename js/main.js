/*global require*/

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: 'bower_components/jquery/dist/jquery',
		underscore: 'bower_components/underscore/underscore-min',
		backbone: 'bower_components/backbone/backbone',
		backboneLocalstorage: 'bower_components/backbone.localstorage/backbone.localStorage-min',
		handlebars: 'bower_components/handlebars/handlebars.amd.min',
		text: 'bower_components/text/text'
	}
});

require([
	'backbone',
	'collections/resultList',
	'collections/cartList',
	'views/searchBoxView',
	'views/resultView',
	'views/cartView',
	'routes/router'
], function (
		Backbone, 
		ResultList,
		CartList, 
		SearchView, 
		ResultView, 
		CartView, 
		Workspace
	) {
	'use strict';

	//Initialize the collection
	var collec = new ResultList();
	var cartColl = new CartList();
	
	// Initialize routing and start Backbone.history()
	var ws = new Workspace({ searchColl: collec, cartColl: cartColl });
	Backbone.history.start();

	// Initialize the views
	var search = new SearchView({action: 'search', router: ws });
	var result = new ResultView({ collection: collec, router: ws});
	var cart = new CartView({ collection: cartColl });
	
	// Inject into the page
	$('.SearchWrapper').append(search.render().el);
	$('.SearchWrapper').append(result.el);
	$('.CartWrapper').append(cart.addStructure().el);
});