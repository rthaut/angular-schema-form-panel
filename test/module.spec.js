/* eslint-env node, mocha */
/* global expect, inject */
describe('Angular Schema Form Bootstrap Panel Decorator', function () {

    let $compile;
    let $rootScope;

    const testSchema = {
        type: "object",
        properties: {
            name: {
                key: "name",
                title: "Name",
                description: "First and Last Name",
                type: "string",
                pattern: /^\w+\s\w+$/
            },
            email: {
                key: "email",
                title: "Email",
                description: "Email Address",
                type: "string",
                pattern: /^[^@]+@\w+(?:\.\w+)+$/
            }
        },
        required: ["name", "email"]
    };

    beforeEach(module('schemaFormPanel'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    describe('Panel', function () {

        it('generates a default panel', function () {
            $rootScope.schema = testSchema;
            $rootScope.form = [{
                type: "panel",
            }];
            $rootScope.model = {};

            const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
            $rootScope.$digest();

            expect(element.contents()[0].className).to.contain('panel panel-default');
        });

        it('generates a success panel', function () {
            $rootScope.schema = testSchema;
            $rootScope.form = [{
                type: "panel",
                style: "success"
            }];
            $rootScope.model = {};

            const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
            $rootScope.$digest();

            expect(element.contents()[0].className).to.contain('panel panel-success');
        });

        describe('Heading', function () {

            let heading;

            beforeEach(function () {
                $rootScope.schema = testSchema;
                $rootScope.form = [{
                    type: "panel",
                    headingClass: "h1 text-uppercase",
                    title: "Heading Testing"
                }];
                $rootScope.model = {};

                const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
                $rootScope.$digest();

                heading = element.find('div.panel-heading');
            });

            it('exists', function () {
                expect(heading).to.not.equal(undefined);
            });

            it('has a custom class', function () {
                expect(heading[0].className).to.contain($rootScope.form[0].headingClass);
            });

            it('has a title', function () {
                const title = heading.children('span.panel-title:first');
                expect(title).to.not.equal(undefined);
                expect(title.html()).to.equal($rootScope.form[0].title);
            });
        });

        describe('Body', function () {

            let body;

            beforeEach(function () {
                $rootScope.schema = testSchema;
                $rootScope.form = [{
                    type: "panel",
                    bodyClass: "bg-warn text-center",
                    items: ["name"]
                }];
                $rootScope.model = {};

                const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
                $rootScope.$digest();

                body = element.find('div.panel-body');
            });

            it('exists', function () {
                expect(body).to.not.equal(undefined);
            });

            it('has a custom class', function () {
                expect(body[0].className).to.contain($rootScope.form[0].bodyClass);
            });

            it('has transpiled item', function () {
                const decorator = body.children(':first');
                expect(decorator.prop('tagName')).to.equal('BOOTSTRAP-DECORATOR');
                expect(decorator.attr('form')).to.equal('schemaForm.form[0].items[0]');
            });

        });

        describe('List', function () {

            let listGroup;

            beforeEach(function () {
                $rootScope.schema = testSchema;
                $rootScope.form = [{
                    type: "panel",
                    bodyClass: "bg-warn text-center",
                    items: ["name"],
                    list: true
                }];
                $rootScope.model = {};

                const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
                $rootScope.$digest();

                listGroup = element.find('ul.list-group');
            });

            it('exists', function () {
                expect(listGroup).to.not.equal(undefined);
            });

            it('has a custom class', function () {
                expect(listGroup[0].className).to.contain($rootScope.form[0].bodyClass);
            });

            it('has a list of transpiled items', function () {
                expect(listGroup.children('li').length).to.equal(1);

                const listElements = listGroup.children('li');
                expect(listElements).to.not.equal(undefined);
                expect(listElements[0].className).to.equal('list-group-item');

                const decorator = listElements.children(':first');
                expect(decorator.prop('tagName')).to.equal('BOOTSTRAP-DECORATOR');
                expect(decorator.attr('form')).to.equal('schemaForm.form[0].items[0]');
            });

        });

        describe('Footer', function () {

            let footer;

            beforeEach(function () {
                $rootScope.schema = testSchema;
                $rootScope.form = [{
                    type: "panel",
                    footer: "<h6><small>Footer Testing</small></h6>",
                    footerClass: "bg-info text-danger"
                }];
                $rootScope.model = {};

                const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
                $rootScope.$digest();

                footer = element.find('div.panel-footer');
            });

            it('exists', function () {
                expect(footer).to.not.equal(undefined);
            });

            it('has a custom class', function () {
                expect(footer[0].className).to.contain($rootScope.form[0].footerClass);
            });

        });

        describe('Collapse', function () {

            describe('Is Collapsible', function () {

                let button;
                let content;
                let contentId;

                beforeEach(function () {
                    $rootScope.schema = testSchema;
                    $rootScope.form = [{
                        type: "panel",
                        title: "Collapsible Panel",
                        collapsible: true
                    }];
                    $rootScope.model = {};

                    const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
                    $rootScope.$digest();

                    content = element.find(`div.panel-collapse`);
                    button = element.find('span.panel-title a:first-of-type');
                    contentId = button.attr('href').replace('#', '');
                });

                it('has a toggle link', function () {
                    expect(button).to.not.equal(undefined);
                });

                it('has a toggle link with a title', function () {
                    expect(button.html()).to.equal($rootScope.form[0].title);
                });

                it('has a toggle link with data-toggle="collapse"', function () {
                    expect(button.attr('data-toggle')).to.equal('collapse');
                });

                it('has a toggle link with a data-parent', function () {
                    expect(button.attr('data-parent')).to.match(/^#PanelGroup\d+$/);
                });

                it('has a toggle link with a target panel content div', function () {
                    expect(button.attr('href')).to.match(/^#PanelContent\d+$/);
                });

                it('has a collapsible panel div', function () {
                    expect(content).to.not.equal(undefined);
                });

                it('has a collapsible panel with that is initially expanded', function () {
                    expect(content[0].className).to.equal('panel-collapse collapse in');
                });

                it('has a collapsible panel with the correct id', function () {
                    expect(content[0].id).to.equal(contentId);
                });
            });

            describe('Is Collapsed Initially', function () {

                let content;

                beforeEach(function () {
                    $rootScope.schema = testSchema;
                    $rootScope.form = [{
                        type: "panel",
                        title: "Collapsed Panel",
                        collapsible: true,
                        collapsed: true
                    }];
                    $rootScope.model = {};

                    const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
                    $rootScope.$digest();

                    content = element.find('div.panel-collapse');
                });

                it('is initially collapsed', function () {
                    expect(content[0].className).to.equal('panel-collapse collapse');
                });

            });

            describe('Has a Default Title', function () {

                let button;

                beforeEach(function () {
                    $rootScope.schema = testSchema;
                    $rootScope.form = [{
                        type: "panel",
                        collapsible: true,
                        collapsed: true
                    }];
                    $rootScope.model = {};

                    const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
                    $rootScope.$digest();

                    button = element.find('span.panel-title a:first-of-type');
                });

                it('generates a default title', function () {
                    expect(button.text()).to.match(/^Form Panel \d+$/)
                });

            });

        });

    });

    describe('Panel Group', function () {

        let group;

        beforeEach(function () {
            $rootScope.schema = testSchema;
            $rootScope.form = [{
                type: "panel-group",
                items: [{
                    type: "panel"
                }]
            }];
            $rootScope.model = {};

            const element = $compile('<form sf-schema="schema" sf-form="form" sf-model="model"></form>')($rootScope);
            $rootScope.$digest();

            group = element.find('div.panel-group');
        });

        it('exists', function () {
            expect(group).to.not.equal(undefined);
        });

        it('has a unique ID', function () {
            expect(group.attr('id')).to.match(/^PanelGroup\d+$/);
        });

        it('has a child panel', function () {
            expect(group.children('div.panel').length).to.equal(1);
        });

    });

});
