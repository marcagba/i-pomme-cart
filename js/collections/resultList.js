/**
* A collection of search results
* @module ResultList
*/
define([
	'backbone',
	'underscore',
	'models/resultItem'
], function (Backbone, _, ResultItem) {
	'use-strict';

	/**
	* @export export (the ResultList collection class)
	*/
	var exports = Backbone.Collection.extend({
		
		/** A result structure */
		model: ResultItem,
		
		/** The web service url to use */
		url : function url(){
			return 'https://itunes.apple.com/search?term=' + this.query;
		}, 

		/**
		* @method parse
		* 
		* Parse the raw response from the server
		*
		* @param {Object} response the server response
		* @param {Object} options some options
		*/
		parse: function parse(response, options) {
			return response.results;
		}
	});

	return exports;
});