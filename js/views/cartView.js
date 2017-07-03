/**
* Responsible of the Cart"s View logic
* @module CartView
*/
'use-strict';

const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
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
    initialize(options = {}) {
        this.collection = options.collection || null;
        this.listenTo(this.collection, 'add', this.render);
    },

    /** TBD */
    render(model, collection) {
        this.addStructure();
        this.total = collection.total;

        $('.CartList-total').html(this.total + '€');

        this.addItem(model, this);

        return this;
    },

    addStructure: _.once(function addStructure() {
        let cartListTmpl = this.template({ total: this.total});
        this.$el.html(cartListTmpl);
        return this;
    }),

    /**

    */
    addItem(itemModel) {
        this.cartItemList.push( new CartItemView({ model: itemModel }) );
        $('.CartList-body').append(_.last(this.cartItemList).render().el);
    }
});

module.exports = CartView;
