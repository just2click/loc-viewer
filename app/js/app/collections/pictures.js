define([
    'backbone',
    'app/models/picture'
], function (Backbone, PictureModel) {
    'use strict';

    var PicturesCollection = Backbone.Collection.extend({
        model: PictureModel,

        sync: function (method, model, options) {
            options.timeout = 8000;
            options.dataType = 'jsonp';
            options.data = { fo: 'json' };
            return Backbone.sync(method, model, options);
        },

        parse: function (response) {
            return response.results;
        }
    });

    return PicturesCollection;
});