define([
	'backbone',
 	'jquery',
 	'underscore',
 	'views/resultItemView',
 	'handlebars',
 	'text!templates/result-nav.html'
 ], function (Backbone, $, _, ResultItemView, Handlebars, resultNavTemplate) {
	'use-stict';

	var exports = Backbone.View.extend({
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
		initialize: function initialize(options) {
			if(!this.collection) this.collection = options && options.collection || '';
		      // this.listenTo(this.collection, 'sync', this.render);
		      if(options && options.itemPerPage) this.itemPerPage = options.itemPerPage;

		      this.listenTo(options.collection, 'sync', this.render);
	    },

	    /**
	    	we don't use arguments given by sync because render could be
	    	trigger by other means
	    */
		render: function render(collection, response, options) {
			if(this.collection.models.length > 0)  {
				this.itemViewList.forEach(this.removeItem, this);
				this.collection.each(this.addItem, this);
			}
			return this;
		},

		/**
			
		*/
		addNav: function addNav() {
			var resultNavTmpl = this.template();
			this.$el.html(resultNavTmpl);
		},

		/**

		*/
		addItem: function addItem(itemModel, ind) {
			if(ind >= this.pageMin && ind <= this.pageMax) {
				this.itemViewList.push( new ResultItemView({ model: itemModel }) );
				this.$el.append(this.itemViewList[this.itemViewList.length - 1].render().el);
			}
		},

		removeItem: function removeItem(itemView) {
			itemView.remove();
		},


		next: function next() {
			this.currentPage++;
			this.disableNext();
		},

		previous: function previous() {
			this.currentPage--;
			this.disablePrevious();
		},

		disablePrevious : function disablePrevious() {
			$('.ResultNav-prev').addClass('ResultNav-prev.disable');
		},

		disableNext: function disableNext() {
			$('.ResultNav-next').addClass('ResultNav-next.disable');
		}

	});

	return exports;
});