define([
    'backbone'
], function (Backbone) {

    'use strict';

    var PictureModel = Backbone.Model.extend({
        defaults: {
            'pk': '',
            'title': '',
            'full': '',
            'square': '',
            'thumb': '',
            'alt': ''
        },

        parse: function (item) {
            var map = {
                pk: item.pk,
                title: item.title,
                full: item.image.full,
                square: item.image.square,
                thumb: item.image.thumb,
                alt: item.image.alt
            };

            return map;
        }
    });

    return PictureModel;
});