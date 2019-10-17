describe("phrase", function () {
    beforeEach(angular.mock.module('phrase'));

    describe("when $translate.instant()", () => {
        let $translate: any;
        let translationId: string;

        function bootStrapAngularOnInstant(phraseEnabled) {
            angular.mock.module(($provide: angular.auto.IProvideService) => {
                $provide.value('phraseEnabled', phraseEnabled);
            });
            angular.mock.inject(($injector: angular.auto.IInjectorService) => {
                $translate = $injector.get('$translate');
            });
        }

        beforeEach(function () {
            translationId = "MY_KEY_NAME";
        });

        it("phrase is enabled, should return a phrase decorated key name instead", () => {
            bootStrapAngularOnInstant(true);
            expect($translate.instant(translationId)).toEqual(`{{__phrase_${translationId}__}}`);
        });

        it("phrase is disabled, should return the key name instead", () => {
            bootStrapAngularOnInstant(false);

            expect($translate.instant(translationId)).toEqual(translationId);
        });
    });
    describe("when translate directive", () => {
        let $compile: angular.ICompileService;
        let elem: angular.IRootElementService;
        let scope: angular.IRootScopeService;

        function bootStrapAngularDirective(phraseEnabled) {
            angular.mock.module(($provide: angular.auto.IProvideService) => {
                $provide.value('phraseEnabled', phraseEnabled);
            });
            angular.mock.inject(($injector: angular.auto.IInjectorService) => {
                const $rootScope = $injector.get('$rootScope');
                $compile = $injector.get('$compile');
                scope = $rootScope.$new();
            });
        }

        describe("and phrase is enabled", () => {
            beforeEach(() => bootStrapAngularDirective(true));

            it("and translation id is within the attribute, should renders the key with phrase decorator", () => {
                const attributeName = "foo";
                elem = angular.element(`<h1 translate="${attributeName}"></h1>`);
                $compile(elem)(scope);
                scope.$digest();
                expect(elem.html()).toEqual(`{{__phrase_${attributeName}__}}`);
            });

            it("and translation id is within the text content, should renders the key with phrase decorator", () => {
                const attributeName = "bar";
                elem = angular.element(`<h1 translate="">${attributeName}</h1>`);
                $compile(elem)(scope);
                scope.$digest();
                expect(elem.html()).toEqual(`{{__phrase_${attributeName}__}}`);
            });
        });

        describe("phrase is disabled", () => {
            beforeEach(() => bootStrapAngularDirective(false));

            it("translation id is within the attribute, should not do anything", () => {
                const attributeName = "foo";
                elem = angular.element(`<h1 translate="${attributeName}"></h1>`);
                $compile(elem)(scope);
                scope.$digest();
                expect(elem.html()).toEqual(attributeName);
            });

            it("translation id is within the text content, should not do anything", () => {
                const attributeName = "bar";
                elem = angular.element(`<h1 translate="">${attributeName}</h1>`);
                $compile(elem)(scope);
                scope.$digest();
                expect(elem.html()).toEqual(attributeName);
            });
        });
    });
});
