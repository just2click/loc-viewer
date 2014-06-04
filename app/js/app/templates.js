define([
    'underscore'
], function (_) {
    var Templates = {};

    Templates['picture'] = [
        '<div class="item panel panel-info" id="panel-<%= pk %>">',
            '<div class="panel-heading" id="<%= pk %>">',
                '<div class="btn-group pull-right">',
                '<button id="btn-remove" type="button" class="btn btn-info btn-xs">',
                    '<span class="glyphicon glyphicon-remove"></span>',
                '</button>',
                '<button id="btn-toggle" type="button" class="btn btn-info btn-xs">',
                    '<span id="collapse" class="glyphicon glyphicon-minus hide"></span>',
                    '<span id="expand" class="glyphicon glyphicon-plus"></span>',
                '</button>',
            '</div>',
            '<h3 class="panel-title" id="panel-title-<%= pk %>">',
                '<%= title %>',
            '</h3>',
            '</div>',
            '<div class="picture-wrapper" id="picture-<%= pk %>">',
                '<img class="img" itemprop="image" src="<%= full %>" title="<%= title %>" />',
            '</div>',
        '</div>'
    ].join('');

    Templates['modal'] = [
        '<div class="modal fade" id="modal-main">',
            '<div class="modal-dialog">',
                '<div class="modal-content">',
                    '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>',
                        '<h4 class="modal-title"><%=title %></h4>',
                    '</div>',
                    '<div class="modal-body">test</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');

    Templates['largePicture'] = [
        '<div class="container-fluid galleryContainer">',
            '<div id="prev" class="pull-left prev-arrow"><a href="#" id="goPrev"><span class="glyphicon glyphicon-chevron-left"></span></a></div>',
            '<div id="selectedImageArea">',
                '<img class="img fitImage" itemprop="image" src="<%= full %>" title="<%= title %>" />',
            '</div>',
            '<div id="next" class="pull-right next-arrow"><a href="#" id="goNext"><span class="glyphicon glyphicon-chevron-right"></span></a></div>',
        '</div>'
    ].join('');

    for (var tmpl in Templates) {
        if (Templates.hasOwnProperty(tmpl)) {
            Templates[tmpl] = _.template(Templates[tmpl]);
        }
    }

    return Templates;
});