/**
* A collection for items into the cart
* @CartList
*/
define([
	'backbone',
	'underscore',
	'models/resultItem'
], function (Backbone, _, ResultItem) {
	'use-strict';

	var exports = Backbone.Collection.extend({
		
		/** Same model as for search*/
		model: ResultItem,
		total: 0,


		initialize: function initialize() {
			this.listenTo(this, 'add', this.updateTotal);
		},

		/**
		* Update the quantity of a track in the chart
		* @method updateQuantity
		*
		*/
		updateQuantity: function updateQuantity(item) {
			item.set('quantity', item.get('quantity') + 1);
			// this.total += item.get('price');
		},

		/**
		* Update the total of the cart
		*/
		updateTotal: function updateTotal() {
			this.total = this.map((el) => el.get('price'))
			.reduce((memo, num) => memo + num);

			return this.total;
		},

	});

	return exports;
});