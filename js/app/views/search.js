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

        html: [
            '<br /><br />',
            '<div id="pictures-list" class="clearfix">',
                '<div id="loading">Loading...</div>',
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
            this.$picturesButtons = this.$('#pictures-buttons');
            this.$loading = this.$('#loading');
            this.$loading.hide();

            this.collection = new PicturesCollection([]);
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'destroy', this.applyMasonry);
        },

        render: function() {
            var that = this;
            this.$imagesloaded = null;

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
            return this;
        },

        runSearch: function(query, step, order, page) {
            var that = this;

            this.$loading.show();

            this.collection.url = [
                'http://loc.gov/pictures/search/?q=',
                escape(query),
                '&fo.json'
            ].join('');

            this.collection.fetch({
                success: function (collection, response, options) {
                    that.cleanUp();
                    that.render();
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
        },

        applyMasonry: function (e) {
            var that = this;

            // if (e) {
            //     _.findWhere(this.views, { 'id': 'picture-' + that.fixPk(e.attributes.pk) }).remove();
            // }

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