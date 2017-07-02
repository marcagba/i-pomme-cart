/**
* Responsible of the Cart"s View logic
* @module CartView
*/
'use-strict';

const Backone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
const ItemView = require('views/cartItemView');
//'text!templates/cart-list.html'
//  cartListTemplate

let CartView = Backbone.View.extend({
    tagName: 'div',
    className: 'Cart CartWrapper-cart',

    template: Handlebars.compile(cartListTemplate),

    cartItemList: [],

    total: 0,

    /**
    * we trigger the renderer when the collection updates
    */
    initialize: function initialize(options) {
        this.collection = options && options.collection || null;
        this.listenTo(this.collection, 'add', this.render);
    },

    /** TBD */
    render: function render(model, collection) {
        this.addStructure();
        this.total = collection.total;

        $('.CartList-total').html(this.total + '€');

        this.addItem(model, this);

        return this;
    },

    addStructure: _.once(function addStructure() {
        var cartListTmpl = this.template({ total: this.total});
        this.$el.html(cartListTmpl);
        return this;
    }),

    /**

    */
    addItem: function addItem(itemModel) {
        this.cartItemList.push( new CartItemView({ model: itemModel }) );
        $('.CartList-body').append(_.last(this.cartItemList).render().el);
    }
});

exports.CartView = CartView;
