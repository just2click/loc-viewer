define([
    'backbone',
    'backbone.localStorage'
], function (Backbone) {

    'use strict';

    var AppModel = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage("AppSettings"),
        defaults: {
            'selectedTheme': 'default',
            'searchForValue': 20
        }
    });

    return AppModel;
});