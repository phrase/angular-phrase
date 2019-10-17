/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/angular-phrase.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Data_utils.ts":
/*!***************************!*\
  !*** ./src/Data_utils.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var DataUtils = /** @class */ (function () {
    function DataUtils() {
    }
    DataUtils.getScript = function (source, callback) {
        var script = document.createElement('script');
        var prior = document.getElementsByTagName('script')[0];
        script.async = true;
        script.onload = script.onreadystatechange = function (_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                script = undefined;
                if (!isAbort && callback)
                    setTimeout(callback, 0);
            }
        };
        script.src = source;
        prior.parentNode.insertBefore(script, prior);
    };
    return DataUtils;
}());
/* harmony default export */ __webpack_exports__["default"] = (DataUtils);


/***/ }),

/***/ "./src/angular-phrase.ts":
/*!*******************************!*\
  !*** ./src/angular-phrase.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Data_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Data_utils */ "./src/Data_utils.ts");

var phrase = angular.module("phrase", ['pascalprecht.translate', 'ng']);
phrase.value("phraseProjectId", "");
phrase.value("phraseEnabled", true);
phrase.value("phraseDecoratorPrefix", "{{__");
phrase.value("phraseDecoratorSuffix", "__}}");
phrase.value("phraseAutoLowercase", true);
phrase.config(["$provide", function ($provide) {
        return $provide.decorator("$translate", ["$delegate", "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix",
            function ($translate, phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) {
                if (phraseEnabled) {
                    $translate._instant = $translate.instant;
                    $translate.instant = function (translationId) { return phraseDecoratorPrefix + "phrase_" + (translationId + phraseDecoratorSuffix); };
                }
                return $translate;
            }]);
    }]);
phrase.config(["$compileProvider", function ($compileProvider) {
        return $compileProvider.directive('translate', ["phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix",
            function (phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) {
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
                            if (elem.attr("translate") !== "") {
                                translationId = elem.attr("translate");
                            }
                            else {
                                translationId = elem.text();
                            }
                        }
                        if (translationId) {
                            var decoratedTranslationId = phraseDecoratorPrefix + "phrase_" + (translationId + phraseDecoratorSuffix);
                            if (attr.translateValues) {
                                decoratedTranslationId = decoratedTranslationId + " (" + attr.translateValues + ")";
                            }
                            elem.html(decoratedTranslationId);
                            elem.removeAttr("translate");
                        }
                    }
                };
            }]);
    }]);
phrase.directive("phraseJavascript", ["phraseEnabled", "phraseProjectId", "phraseAutoLowercase", "$window",
    function (phraseEnabled, phraseProjectId, phraseAutoLowercase, $window) {
        return {
            restrict: "EA",
            replace: true,
            link: function () {
                if (phraseEnabled) {
                    var url = "https://phraseapp.com/assets/in-context-editor/2.0/app.js?" + new Date().getTime();
                    $window.PHRASEAPP_CONFIG = {
                        projectId: phraseProjectId,
                        autoLowercase: phraseAutoLowercase,
                    };
                    _Data_utils__WEBPACK_IMPORTED_MODULE_0__["default"].getScript(url);
                }
            }
        };
    }]);


/***/ })

/******/ });
//# sourceMappingURL=angular-phrase.js.map