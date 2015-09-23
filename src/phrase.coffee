phrase = angular.module "phrase", ['pascalprecht.translate', 'ng']

phrase.value "phraseProjectId", ""
phrase.value "phraseEnabled", true
phrase.value "phraseDecoratorPrefix", "{{__"
phrase.value "phraseDecoratorSuffix", "__}}"

phrase.config ["$provide", ($provide) ->
  $provide.decorator "$translate", ["$delegate", "phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", ($translate, phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) ->

    if phraseEnabled
      $translate._instant = $translate.instant
      $translate.instant = (translationId, interpolateParams, interpolationId) ->
        "#{phraseDecoratorPrefix}phrase_#{translationId}#{phraseDecoratorSuffix}"

    $translate
  ]
]

phrase.config ["$compileProvider", ($compileProvider) ->
  $compileProvider.directive 'translate', ["phraseEnabled", "phraseDecoratorPrefix", "phraseDecoratorSuffix", (phraseEnabled, phraseDecoratorPrefix, phraseDecoratorSuffix) ->

    if phraseEnabled
      return {
        priority: 1001,
        terminal: true,
        restrict: 'AE',
        scope: true,
        compile: (elem, attr) ->
          translationId = elem.attr("translate")
          decoratedTranslationId = "#{phraseDecoratorPrefix}phrase_#{translationId}#{phraseDecoratorSuffix}"
          if attr.translateValues
            decoratedTranslationId = "#{decoratedTranslationId} (#{attr.translateValues})"
          elem.html(decoratedTranslationId);
          elem.removeAttr("translate")
      }
    else
      return {}
  ]
]
