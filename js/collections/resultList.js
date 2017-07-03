/**
* A collection of search results
* @module ResultList
*/
'use-strict';
const Backbone = require('backbone');
const ResultItem = require('../models/resultItem');

/**
 * @export export (the ResultList collection class)
 */
let ResultList = Backbone.Collection.extend({
    /** A result structure */
    model: ResultItem,

    /** The web service url to use */
    url(){
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
    parse(response, options) {
        return response.results;
    }
});

module.exports = ResultList;

