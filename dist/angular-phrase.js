/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(angular) {var phrase = angular.module("phrase", ['pascalprecht.translate', 'ng']);
phrase.value("phraseProjectId", "");
phrase.value("phraseEnabled", true);
phrase.value("phraseDecoratorPrefix", "{{__");
phrase.value("phraseDecoratorSuffix", "__}}");
phrase.value("phraseAutoLowercase", true);
phrase.config(["$provide", function ($provide) {
        return $provide.decorator("$translate", ["$delegate", "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", function ($translate, phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) {
                if (phraseEnabled) {
                    $translate._instant = $translate.instant;
                    $translate.instant = function (translationId, interpolateParams, interpolationId) {
                        return phraseDecoratorPrefix + "phrase_" + translationId + phraseDecoratorSuffix;
                    };
                }
                return $translate;
            }]);
    }]);
phrase.config(["$compileProvider", function ($compileProvider) {
        return $compileProvider.directive('translate', ["phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", function (phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) {
                if (!phraseEnabled) {
                    return {};
                }
                return {
                    priority: 1001,
                    terminal: true,
                    restrict: 'AE',
                    scope: true,
                    compile: function (elem, attr) {
                        var translationId;
                        if (elem.attr("translate") != undefined) {
                            if (elem.attr("translate") != "")
                                translationId = elem.attr("translate");
                            else
                                translationId = elem.text();
                        }
                        if (translationId) {
                            var decoratedTranslationId = phraseDecoratorPrefix + 'phrase_' + translationId + phraseDecoratorSuffix;
                            if (attr.translateValues)
                                decoratedTranslationId = decoratedTranslationId + ' (' + attr.translateValues + ')';
                            elem.html(decoratedTranslationId);
                            elem.removeAttr("translate");
                        }
                    }
                };
            }]);
    }]);
phrase.directive("phraseJavascript", ["phraseEnabled", "phraseProjectId", "phraseAutoLowercase", "$window", function (phraseEnabled, phraseProjectId, phraseAutoLowercase, $window) {
        return {
            restrict: "EA",
            replace: true,
            link: function () {
                if (phraseEnabled) {
                    var url = ['https://', 'phraseapp.com/assets/in-context-editor/2.0/app.js?', new Date().getTime()].join('');
                    $window.PHRASEAPP_CONFIG = {
                        projectId: phraseProjectId,
                        autoLowercase: phraseAutoLowercase,
                    };
                    $window.jQuery.getScript(url);
                }
            }
        };
    }]);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
//# sourceMappingURL=angular-phrase.js.map
