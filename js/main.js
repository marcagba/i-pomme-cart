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
let collec = new ResultList();
let cartColl = new CartList();

// Initialize routing and start Backbone.history()
let ws = new Workspace({ searchColl: collec, cartColl: cartColl });
Backbone.history.start();

// Initialize the views
let search = new SearchView({action: 'search', router: ws });
let result = new ResultView({ collection: collec, router: ws});
let cart = new CartView({ collection: cartColl });

// Inject into the page
$('.SearchWrapper').append(search.render().el);
$('.SearchWrapper').append(result.el);
$('.CartWrapper').append(cart.addStructure().el);


