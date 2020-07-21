declare global {
    const angular: ng.IAngularStatic;
}
import DataUtils from "./data-utils";
const phrase = angular.module("phrase", ['pascalprecht.translate', 'ng']);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
interface ITranslateServiceExtend extends angular.translate.ITranslateService {
    _instant: angular.translate.ITranslateService['instant']
}

phrase.value("phraseProjectId", "");
phrase.value("phraseEnabled", true);
phrase.value("phraseDecoratorPrefix", "{{__");
phrase.value("phraseDecoratorSuffix", "__}}");
phrase.value("phraseAutoLowercase", true);

phrase.config(["$provide", ($provide: angular.auto.IProvideService) => {
    return $provide.decorator("$translate", ["$delegate", "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix",
        ($translate: ITranslateServiceExtend, phraseEnabled: boolean, phraseDecoratorPrefix: string, phraseDecoratorSuffix: string) => {
            if (phraseEnabled) {
                $translate._instant = $translate.instant;
                $translate.instant = (translationId: string | string[]): any => {
                    if (typeof translationId === "object") {
                        return translationId.reduce<Record<string, string>>((prev, curr: string) => {
                            prev[curr] = `${phraseDecoratorPrefix}phrase_${curr as string}${phraseDecoratorSuffix}`;
                            return prev;
                        }, {});
                    }

                    return `${phraseDecoratorPrefix}phrase_${translationId as string}${phraseDecoratorSuffix}`;
                };
            }
            return $translate;
        }]);
}]);

phrase.config(["$compileProvider", ($compileProvider: angular.ICompileProvider) => {
    return $compileProvider.directive('translate', ["phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix",
        (phraseEnabled: boolean, phraseDecoratorPrefix: string, phraseDecoratorSuffix: string) => {
            if (!phraseEnabled) {
                return {};
            }
            return {
                priority: 1001,
                terminal: true,
                restrict: 'AE',
                scope: true,
                compile: (elem, attr) => {
                    let translationId: string;
                    if (elem.attr("translate") != undefined) {
                        if (elem.attr("translate") !== "") {
                            translationId = elem.attr("translate");
                        } else {
                            translationId = elem.text();
                        }
                    }

                    if (translationId) {
                        let decoratedTranslationId = `${phraseDecoratorPrefix}phrase_${translationId + phraseDecoratorSuffix}`;
                        if (attr.translateValues) {
                            decoratedTranslationId = `${decoratedTranslationId} (${(attr.translateValues as string)})`;
                        }
                        elem.html(decoratedTranslationId);
                        elem.removeAttr("translate");
                    }
                }
            };
        }]);
}]);

phrase.directive("phraseJavascript", ["phraseEnabled", "phraseProjectId", "phraseAutoLowercase", "$window",
    (phraseEnabled: boolean, phraseProjectId: string, phraseAutoLowercase: boolean, $window: Window) => {
        return {
            restrict: "EA",
            replace: true,
            link: (): void => {
                if (phraseEnabled) {
                    const url = `https://phraseapp.com/assets/in-context-editor/2.0/app.js?${new Date().getTime()}`;
                    $window.PHRASEAPP_CONFIG = {
                        projectId: phraseProjectId,
                        autoLowercase: phraseAutoLowercase,
                    };
                    DataUtils.getScript(url);
                }
            }
        };
    }]);
