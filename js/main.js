/*global require*/

'use strict';

const Backbone = require('backbone');
const $ = require('jquery');
const ResultList = require('./collections/resultList');
const CartList = require('./collections/cartList');
const SearchView = require('./views/searchBoxView');
const ResultView = require('./views/resultView');
const CartView = require('./views/cartView');
const Workspace = require('./routes/router');

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


