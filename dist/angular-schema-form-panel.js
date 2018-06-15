/* global angular */
angular.module('schemaFormPanel', ['schemaForm']).config([
    'schemaFormProvider',
    'schemaFormDecoratorsProvider',
    'sfBuilderProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) {

        function repeatTransclusion(args) {
            var transclusions = args.fieldFrag.querySelectorAll('[sf-repeat-transclude]');

            if (transclusions.length) {
                transclusions.forEach(function (node) {
                    var sub = node.getAttribute('sf-repeat-transclude') || 'items';
                    var items = args.form[sub];
                    if (items && items.length) {
                        var childFrag = args.build(items, args.path + '.' + sub, args.state);
                        var children = Array.from(childFrag.childNodes);
                        children.forEach(function (item) {
                            var newNode = node.cloneNode();
                            newNode.appendChild(item);
                            node.parentNode.appendChild(newNode);
                        });
                        node.parentNode.removeChild(node);
                    }
                });
            }
        }

        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator',
            'panel',
            'src/templates/angular-schema-form-panel.html', [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModel,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ].concat(repeatTransclusion)
        );

        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator',
            'panel-group',
            'src/templates/angular-schema-form-panel-group.html', [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModel,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.simpleTransclusion
            ]
        );

    }
]);

angular.module('schemaFormPanel').run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/angular-schema-form-panel-group.html','<div class="panel-group schema-form-panel-group {{::form.groupClass}}" ng-init="groupId = $id" id="PanelGroup{{groupId}}" role="tablist" aria-multiselectable="false"></div>\n');
$templateCache.put('src/templates/angular-schema-form-panel.html','<div class="panel panel-{{form.style || \'default\'}} schema-form-panel {{::form.panelClass}}" ng-init="panelId = $id" ng-id="Panel{{panelId}}">\n\n    <div class="panel-heading {{::form.headingClass}}" role="tab" id="PanelHeading{{panelId}}" ng-hide="form.noHeading === true && !form.collapsible">\n\n        <span class="panel-title" ng-if="!form.collapsible">{{form.title}}</span>\n\n        <span class="panel-title" ng-if="form.collapsible" ng-init="collapsed = (form.collapsed === true)">\n            <a role="button" data-toggle="collapse" data-parent="#PanelGroup{{groupId || panelId}}" href="#PanelContent{{panelId}}" aria-expanded="{{!collapsed}}" aria-controls="PanelContent{{panelId}}">{{form.title || \'Form Panel \' + panelId}}</a>\n        </span>\n\n    </div>\n\n    <div id="PanelContent{{panelId}}" class="panel-collapse" ng-class="{\'collapse\': (form.collapsible === true), \'in\': form.collapsed !== true}" role="tabpanel" aria-labelledby="PanelHeading{{panelId}}">\n        <div class="panel-body {{::form.bodyClass}}" ng-if="form.list !== true" sf-field-transclude="items"></div>\n        <ul class="list-group {{::form.bodyClass}}" ng-if="form.list === true">\n            <li class="list-group-item" sf-repeat-transclude="items"></li>\n        </ul>\n        <div class="panel-footer {{::form.footerClass}}" ng-hide="form.noFooter === true || !form.footer.length" ng-bind-html="form.footer"></div>\n    </div>\n\n</div>\n');}]);