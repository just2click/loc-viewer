define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var AboutView = Backbone.View.extend({

        initialize: function () {

        },

        render: function () {
            var html = [
                '<div class="jumbotron">',
                    '<div class="container">',
                        '<h2>Library of Congress Image Search Utility</h2>',
                        'This is a sample Backbone based web application for searching images on the "Library of Congress"',
                        '<hr />',
                        '<p>',
                            'This application currently features the following:',
                            '<ul>',
                                '<li>Textual searching of images</li>',
                                '<li>Images are presented with Masonry styling (try to resize the page)</li>',
                                '<li>You can paste a link with a search term to run the search</li>',
                                '<li>Each picture can be expanded (if the full image is larger than what is currently displayed)</li>',
                            '</ul>',
                        '</p>',
                        '<p>',
                            'Future developments:',
                            '<ul>',
                                '<li>Saving the last 10 searches into local storage for a quicker lookup</li>',
                                '<li>Add some application settings</li>',
                                '<li>Change the display into an image gallery style</li>',
                            '</ul>',
                        '</p>',
                    '</div>',
                '</div>'
            ].join('');
            this.$el.html(html);
            return this;
        }
    });

    return AboutView;
});