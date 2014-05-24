define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/about.html',
], function ($, _, Backbone, tmpl) {
    'use strict';

    var AboutView = Backbone.View.extend({

        template: _.template(tmpl),

        initialize: function () {

        },

        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });

    return AboutView;
});