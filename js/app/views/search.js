define([
    'jquery',
    'underscore',
    'backbone',
    'masonry',
    'imagesloaded',
    'app/collections/pictures',
    'app/views/picture',
    'app/templates'
], function ($, _, Backbone, Masonry, ImagesLoaded, PicturesCollection, PictureView, Templates) {

    'use strict';

    var SearchView = Backbone.View.extend({

        innerHTML: [

        ].join(''),

        html: [
            '<br /><br />',
            '<div id="loading">Loading...</div>',
            '<div id="helptext">',
                '<div class="well well-lg">',
                    '<h3>Type text in the search box to look up images from the Library of Congress</h3>',
                '</div>',
            '</div>',
            '<div id="pictures-list" class="clearfix">',
            '</div>',
        ].join(''),

        views: [],

        collection: new PicturesCollection([]),

        events: {
            'click #btn-clear': 'cleanUp',
            'resized': 'applyMasonry'
        },

        initialize: function() {
            this.$el.html(this.html);
            this.$picturesList = this.$('#pictures-list');
            this.$loading = this.$('#loading');
            this.$helptext = this.$('#helptext');

            this.$loading.hide();

            this.collection = new PicturesCollection([]);
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'destroy', this.removePicture);

            this.hasNoImages();
        },

        render: function() {
            var that = this;

            if (this.collection.length) {

                this.collection.each(function (element, index, list) {
                    if (element.get('alt') !== 'item not digitized thumbnail') {
                        element.fixedPk = that.fixPk(element.get('pk'));
                        var picture = new PictureView({
                            model: element,
                            id: ['picture-',that.fixPk(element.get('pk'))].join('')
                        });
                        that.$picturesList.append(picture.render().el);
                        that.views.push(picture);
                    }
                });
            }

            this.hasNoImages();
            return this;
        },

        runSearch: function(query, step, order, page) {
            var that = this;

            this.$loading.show();
            this.$helptext.hide();

            this.collection.url = [
                'http://loc.gov/pictures/search/?q=',
                escape(query),
                '&fo.json'
            ].join('');

            this.collection.fetch({
                success: function (collection, response, options) {
                    that.cleanUp();
                    that.render();
                    that.$loading.hide();
                    setTimeout(that.applyMasonry, 2000);
                },
                error: function (collection, response, options) {
                    console.log('Error' + response);
                }
            });
        },

        cleanUp: function() {
            console.log('Clean Up');
            for (var i = 0; i<this.views.length; i++) {
                this.views[i].remove();
            }
            this.views.length = 0;
            this.$picturesList.html('');
            this.applyMasonry();
            this.hasNoImages();
        },

        removePicture: function (e) {
            if (e) {
                _.findWhere(this.views, { 'id': 'picture-' + this.fixPk(e.attributes.pk) }).remove();
            }

            this.applyMasonry();
            this.hasNoImages();
        },

        hasNoImages: function () {
            if (this.views.length === 0) {
                this.$helptext.show();
            } else {
                this.$helptext.hide();
            }
        },

        applyMasonry: function (e) {
            var $container = document.querySelector('#pictures-list');

            ImagesLoaded($container, function () {
                var msnry = new Masonry( $container, {
                  // disables initial layout
                  columnWidth: 50,
                  isAnimated: true,
                  itemSelector: '.item',
                  gutter: 10,
                  isOriginLeft: false
                });
                // manually trigger initial layout
                msnry.layout();
            });
        },

        fixPk: function (pk) {
            var replaced = pk.replace(/\//g, '_');

            return replaced.replace(/\./g, '_');
        }
    });

    return SearchView;
});