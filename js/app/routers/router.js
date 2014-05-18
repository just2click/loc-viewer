define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            '': 'goToSearch', // Index route
            'search': 'goToSearch',
            'search/:search': 'hasSearchTerm',
            //'dash/:place': 'goToDash',
            'about': 'goToAbout'
        },

        initialize: function (view) {
            this.appView = view;
        },

        goToSearch: function () {
            this.appView.setPage('search');
        },

        goToAbout: function () {
            this.appView.setPage('about');
        },

        hasSearchTerm: function (queryString) {
            if (queryString) {
                if (queryString.length > 0) {
                    this.appView.setPage('search');
                    this.appView.runSearch(queryString);
                }
            }
        },

        // and the function that parses the query string can be something like :
        parseQueryString: function (queryString){
            var params = {};
            if(queryString){
                _.each(
                    _.map(decodeURI(queryString).split(/&/g),function(el,i){
                        var aux = el.split('='), o = {};
                        if (aux.length >= 1){
                            var val = undefined;
                            if(aux.length == 2)
                                val = aux[1];
                            o[aux[0]] = val;
                        }
                        return o;
                    }),
                    function(o){
                        _.extend(params,o);
                    }
                );
            }
            return params;
        }
    });

    return Router;
});