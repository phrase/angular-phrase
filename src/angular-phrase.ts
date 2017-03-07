/// <reference path="../typings/index.d.ts" />
var phrase = angular.module("phrase", ['pascalprecht.translate', 'ng'])

phrase.value("phraseProjectId", "")
phrase.value("phraseEnabled", true)
phrase.value("phraseDecoratorPrefix", "{{__")
phrase.value("phraseDecoratorSuffix", "__}}")
phrase.value("phraseAutoLowercase", true)

phrase.config(["$provide", function($provide) {
  return $provide.decorator("$translate", ["$delegate", "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", function($translate, phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) {
    if(phraseEnabled){
      $translate._instant = $translate.instant
      $translate.instant = function(translationId, interpolateParams, interpolationId) : string {
        return phraseDecoratorPrefix+"phrase_"+translationId+phraseDecoratorSuffix
      }
    }
    return $translate
  }])
}])

phrase.config(["$compileProvider", function($compileProvider) {
  return $compileProvider.directive('translate', ["phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", function(phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) : any {
    if(!phraseEnabled){
      return {}
    }
    return {
      priority: 1001,
      terminal: true,
      restrict: 'AE',
      scope: true,
      compile: function(elem, attr) {
        let translationId:string
        if(elem.attr("translate") != undefined){
          if(elem.attr("translate") != "")
            translationId = elem.attr("translate")
          else
            translationId = elem.text()
        }

        if(translationId){
          let decoratedTranslationId : string = phraseDecoratorPrefix+'phrase_'+translationId+phraseDecoratorSuffix
          if(attr.translateValues)
            decoratedTranslationId = decoratedTranslationId+' ('+attr.translateValues+')'
          elem.html(decoratedTranslationId)
          elem.removeAttr("translate")
        }
      }
    }
  }])
}])

phrase.directive("phraseJavascript", ["phraseEnabled", "phraseProjectId", "phraseAutoLowercase", "$window", (phraseEnabled, phraseProjectId, phraseAutoLowercase, $window) => {
  return {
    restrict: "EA",
    replace: true,
    link: () : void => {
      if(phraseEnabled) {
        let url : string = ['https://', 'phraseapp.com/assets/in-context-editor/2.0/app.js?', new Date().getTime()].join('')
        $window.PHRASEAPP_CONFIG = {
          projectId: phraseProjectId,
          autoLowercase: phraseAutoLowercase,
        }
        $window.jQuery.getScript(url)
      }
    }
  }
}])
