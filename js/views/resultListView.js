'use-strict';

const Backbone = require('backbone');
const $ = require('jquery');
const Handlebars = require('handlebars');
const ResultItemView = require('./resultItemView');
const fs = require('fs');
const resultNavTemplate = fs.readFileSync('../templates/result-nav.html', 'utf8');

let ResultListView = Backbone.View.extend({
    className: 'ResultList',

    template: Handlebars.compile(resultNavTemplate),

    itemViewList: [],

    itemPerPage: 5,
    currentPage: 0,
    pageMax: 0,

    /**
        prepare pagination
        listen to the collection
    */
    initialize(options = {}) {
        if (!this.collection) {
            this.collection = options.collection || '';
        }
        // this.listenTo(this.collection, 'sync', this.render);
        if (options && options.itemPerPage) {
            this.itemPerPage = options.itemPerPage;
        }
        this.listenTo(options.collection, 'sync', this.render);
    },

    /**
        we don't use arguments given by sync because render could be
        trigger by other means
    */
    render(collection, response, options) {
        if (this.collection.models.length > 0) {
            this.itemViewList.forEach(this.removeItem, this);
            this.collection.each(this.addItem, this);
        }
        return this;
    },

    /**

    */
    addNav() {
        let resultNavTmpl = this.template();
        this.$el.html(resultNavTmpl);
    },

    /**

    */
    addItem(itemModel, ind) {
        if (ind >= this.pageMin && ind <= this.pageMax) {
            this.itemViewList.push( new ResultItemView({ model: itemModel }) );
            this.$el.append(this.itemViewList[this.itemViewList.length - 1].render().el);
        }
    },

    removeItem(itemView) {
        itemView.remove();
    },

    next() {
        this.currentPage++;
        this.disableNext();
    },

    previous() {
        this.currentPage--;
        this.disablePrevious();
    },

    disablePrevious() {
        $('.ResultNav-prev').addClass('ResultNav-prev.disable');
    },

    disableNext() {
        $('.ResultNav-next').addClass('ResultNav-next.disable');
    }

});

module.exports = ResultListView;

