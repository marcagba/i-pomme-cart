/**
* Responsible for a search result View logic
*/
'use-strict';

const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
const fs = require('fs');
const resultItemTemplate = fs.readFileSync('templates/result-item.html', 'utf8');

let ResultItemView = Backbone.View.extend({

    className: 'ResultItem',

    template: Handlebars.compile(resultItemTemplate),

    initialize: function initialize(options) {
        this.model = options && options.model || null;
        this.router = options && options.router || null ;
        this.listenTo(this.model, 'change', this.render);
    },

    render: function render() {
        if(this.model) {
            var itemTmpl = this.template(this.model.toJSON());
            this.$el.html(itemTmpl);
        }
        return this;
    },

    events: {
        'click': 'click'
    },

    click: function click(e) {
        e.preventDefault();
        e.stopPropagation();

        this.router.navigate('add2Cart/' + this.model.get('id'), true);
    }
});

module.exports = ResultItemView;

