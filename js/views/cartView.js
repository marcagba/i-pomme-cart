/**
* Responsible of the Cart"s View logic
* @module CartView
*/
'use-strict';

const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
const ItemView = require('./cartItemView');
const fs = require('fs');
const cartListTemplate = fs.readFileSync('templates/cart-list.html', 'utf8');

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

module.exports = CartView;
