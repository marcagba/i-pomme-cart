/**
* A result model
* @module ResultItem
*/
'use-strict';

const Backbone = require('backbone');
const _ = require('underscore');
let ResultItem = Backbone.Model.extend({

    /** Describe the property of a result model*/
    defaults : {
        id: 'NoId',
        title : 'No Untitled',
        artist: 'Unknow',
        price: 0,
        quantity: 0,
        image: '../images/placeholder.png'
    },

    /**
    * Enable to format the raw result from the server
    * @method parse
    *
    * @param {Object} response  a raw response object from the server
    * @param {Object} options facultatives options
    * @return  {Object} a reformated attributes object
    * ready to be added to a model
    */
    parse: function parse(response, options) {
        return {
            id : response.trackId,
            title: response.trackName,
            artist: response.artistName,
            price: response.trackPrice,
            image: response.artworkUrl60
        };
    }
});

 module.exports = ResultItem;;

