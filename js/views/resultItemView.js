/**
* Responsible for a search result View logic
*/
'use-strict';

const Backone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
//'text!templates/result-item.html'
//resultItemTemplate) {
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

exports.ResultItemView = ResultItemView;

