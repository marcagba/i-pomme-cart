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
		jquery: 'node_modules/jquery/dist/jquery',
		underscore: 'node_modules/underscore/underscore-min',
		backbone: 'node_modules/backbone/backbone',
		backboneLocalstorage: 'node_modules/backbone.localstorage/backbone.localStorage-min',
		handlebars: 'node_modules/handlebars/dist/handlebars.amd.min',
		text: 'node_modules/requirejs-text/text'
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

