import '../../../src/angular-phrase';
import DataUtils from '../../../src/data-utils';

describe('phraseJavascript', () => {
    const projectId = "my-project-id";
    const autoLowercase = false;

    let scope: angular.IScope;
    let elem: angular.IRootElementService;
    let enabled: boolean;
    let $compile: ng.ICompileService;
    let getScriptSpy: jasmine.Spy;

    function mockAngularInject(){
        angular.mock.inject(($injector: angular.auto.IInjectorService) => {
            getScriptSpy = spyOn(DataUtils, 'getScript');

            const $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');

            scope = $rootScope.$new();
            elem = angular.element('<head><phrase-javascript></phrase-javascript></head>');
            $compile(elem)(scope);
            scope.$digest();
        });
    }

    beforeEach(() => {
        delete (window as any).PHRASEAPP_CONFIG;
    });

    beforeEach(angular.mock.module('phrase', ($provide: angular.auto.IProvideService) => {
        $provide.value('$window', window);
        $provide.value('phraseProjectId', projectId);
        $provide.value('phraseEnabled', enabled);
        $provide.value('phraseAutoLowercase', autoLowercase);
    }));

    describe("when phrase is disabled", () => {
        beforeEach(() => {
            enabled = false;
        });

        beforeEach(mockAngularInject);

        it("should not attach the config", () => {
            expect((window as any).PHRASEAPP_CONFIG).toBeUndefined();
        });
        it("should not fetch the javascript snippet", () => {
            expect(getScriptSpy).not.toHaveBeenCalled();
        });
    });
    describe("phrase is enabled", () => {
        beforeEach(() => {
            enabled = true;
        });

        beforeEach(mockAngularInject);

        it("should fetch and evaluate the javascript snippet", () => {
            expect(getScriptSpy).toHaveBeenCalled();
            expect(getScriptSpy).toHaveBeenCalledTimes(1);
        });

        describe("and configuration is set", () => {
            it("should attach the project id to the config object", () => {
                expect((window as any).PHRASEAPP_CONFIG.projectId).toEqual(projectId);
            });
            it("should attach the autoLowercase setting to the config object", () => {
                expect((window as any).PHRASEAPP_CONFIG.autoLowercase).toBeFalsy();
            });
        });
    });
});
