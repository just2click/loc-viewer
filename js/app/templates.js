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
        '<div class="modal fade">',
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

    for (var tmpl in Templates) {
        if (Templates.hasOwnProperty(tmpl)) {
            Templates[tmpl] = _.template(Templates[tmpl]);
        }
    }

    return Templates;
});