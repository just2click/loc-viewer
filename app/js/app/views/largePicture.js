define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/modal',
    'app/templates'
], function ($, _, Backbone, ModalView, Templates) {

    'use strict';

    var LargePictureView = ModalView.extend({

        template: Templates['largePicture'],

        events: {
            'click #goPrev': 'goPrev',
            'click #goNext': 'goNext'
        },

        initialize: function(options) {
            this.parent = options.parent;

            ModalView.prototype.initialize.apply(this, arguments);
            this.$bodyEl.html(this.template(this.model.toJSON()));
            this.$modalMain = this.$('#modal-main');
        },

        render: function() {
            this.$modalMain.addClass('modal-wide');
            return this;
        },

        resetPicture: function () {
            var data = this.model.toJSON();
            this.$bodyEl.empty();
            this.$bodyEl.html(this.template(data));
            this.$titleEl.html(data.title);
        },

        goPrev: function () {
            this.model = this.parent.getPrevPk(this.model.fixedPk);
            this.resetPicture();
            return false;
        },

        goNext: function () {
            this.model = this.parent.getNextPk(this.model.fixedPk);
            this.resetPicture();
            return false;
        }

    });

    return LargePictureView;
});
