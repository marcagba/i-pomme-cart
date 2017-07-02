/**
* The logic behind the search bar
* @module SearchBoxView
*/
'use-strict';

const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
const fs = require('fs');
const searchBoxTemplate = fs.readFileSync('templates/search-box.html', 'utf8');

let SearchBoxView  = Backbone.View.extend({

    className: 'SearchBoxWrapper',

    template: Handlebars.compile(searchBoxTemplate),

    /** needs an action to perform when a saerch is fire, and a router */
    initialize: function initialize(options) {
        this.action = options && options.action || '';
        this.router = options && options.router || '';
        console.log(this.action);
    },

    render: function render() {
        var searchBoxTmpl = this.template({ action: this.action });
        this.$el.html(searchBoxTmpl);
        return this;
    },

    events: {
        'submit': 'submit'
    },

    /** we redirect submit to perform a search without refreshing the page */
    submit: function submit(e) {
        e.preventDefault();
        e.stopPropagation();

        var query = this.$('.SearchBox-field').val();
        if (query) {
            this.router.navigate('search/' + query, true);
        }
    }
});

module.exports = SearchBoxView;

