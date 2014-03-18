phrase = angular.module "phrase", ['pascalprecht.translate', 'ng']

phrase.value "phraseAuthToken", ""
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
