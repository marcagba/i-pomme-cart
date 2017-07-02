/**
* Responsible for the search result view
* @module ResultView
*/
'use-strict';

const Backone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
const Handlebars = require('handlebars');
const ResultItemView = require('views/ResultItemView');
const fs = require('fs');
const resultListTemplate = fs.readFileSync('templates/result-list.html', 'utf8');
const resultNavTemplate = fs.readFileSync('templates/result-nav.html', 'utf8');

let ResultView = Backbone.View.extend({
    className: 'ResultWrapper',

    templateList: Handlebars.compile(resultListTemplate),
    templateNav: Handlebars.compile(resultNavTemplate),

    itemViewList: [],

    pagination: null,
    itemPerPage: 10,
    currentPage: 0,
    maxPage: 0,


    /**
        prepare pagination
        listen to the collection
    */
    initialize: function initialize(options) {
        if(!this.collection) this.collection = options && options.collection || '';
        if(options && options.itemPerPage) this.itemPerPage = options.itemPerPage;
        this.router = options.router;
        // this.renderNav   = _.once(this.addNav);
        // this.renderList = _.once(this.addList);

        this.listenTo(options.collection, 'sync', this.createPagination);
    },

    /**
        we don't use arguments given by sync because render could be
        trigger by other means
    */
    render: function render() {
        var current = this.currentPage;
        // this.renderNav();
        // this.renderList();
        this.addList();
        this.addNav();
        this.itemViewList.forEach(this.removeItem, this);
        this.pagination[current].forEach(this.addItem, this);

        return this;
    },

    // events: {
    //  'click': 'click'
    // },

    // click: function click(e) {
    //  e.preventDefault();
    //  e.stopPropagation();
    // },

    /** Add the result navigation template to the view.
        Can only be executed once
    */
    addNav: _.once(function addNav() {
        var resultNavTmpl = this.templateNav();
        this.$el.append(resultNavTmpl);
    }),

    /** Add the result list template to the view.
        Can only be executed once
    */
    addList: _.once(function addList() {
        var resultListTmpl = this.templateList();
        this.$el.append(resultListTmpl);
    }),

    /**

    */
    addItem: function addItem(itemModel, ind) {
        var _this = this;
        this.itemViewList.push( new ResultItemView({ model: itemModel, router: _this.router}) );
        $('.ResultList').append(_.last(this.itemViewList).render().el);
    },

    removeItem: function removeItem(itemView) {
        itemView.remove();
    },

    /** a skilful calculation to know on which page is the given model ;) */
    getPage: function getPage(el, ind) {
        return (ind - ind % this.itemPerPage) / this.itemPerPage;
    },

    createPagination: function createPagination(coll, resp, opts) {
        // this.itemViewList.forEach(this.removeItem, this);
        this.pagination = coll.groupBy(this.getPage, this);
        this.maxPage = _.max(this.pagination);
        this.render();
    },

    next: function next() {
        this.currentPage++;
        if(this.currentPage === this.maxPage) this.disableNext();
    },

    previous: function previous() {
        this.currentPage--;
        if(this.currentPage === 0) this.disablePrevious();
    },

    disablePrevious : function disablePrevious() {
        $('.ResultNav-prev').addClass('ResultNav-prev.disable');
    },

    disableNext: function disableNext() {
        $('.ResultNav-next').addClass('ResultNav-next.disable');
    }
});

exports.ResultView = ResultView;
