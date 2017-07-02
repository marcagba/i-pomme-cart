/**
* Responsible for a cart item View logic
* @module CartItemView
*/
'use-strict';

const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
const fs = require('fs');
const cartItemTemplate = fs.readFileSync('templates/cart-item.html', 'utf8');

let CartItemView = Backbone.View.extend({

	tagName: 'tr',
	className: 'CartItem',

	template: Handlebars.compile(cartItemTemplate),

	initialize: function initialize(options) {
		this.model = options && options.model || null;
		this.listenTo(this.model, 'change', this.render);
	},

	render: function render() {
		if(this.model) {
			var itemTmpl = this.template(this.model.toJSON());
			this.$el.html(itemTmpl);
		}
		return this;
	},

	// events: {
	// 	'click': 'click'
	// },

	// click: function click(e) {
	// 	e.preventDefault();
	// 	e.stopPropagation();

	// 	console.log('Hello World !');
	// }
});

module.exports = CartItemView;

