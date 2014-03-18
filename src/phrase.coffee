phrase = angular.module "phrase", ['pascalprecht.translate', 'ng']

phrase.value "phrase.authToken", ""
phrase.value "phrase.enabled", true
phrase.value "phrase.decoratorPrefix", "{{__"
phrase.value "phrase.decoratorSuffix", "__}}"

phrase.config ["$provide", ($provide) ->
  $provide.decorator "$translate", ["$delegate", "phrase.enabled", "phrase.decoratorPrefix", "phrase.decoratorSuffix", ($translate, enabled, decoratorPrefix, decoratorSuffix) ->
    if enabled
      $translate._instant = $translate.instant
      $translate.instant = (translationId, interpolateParams, interpolationId) ->
        "#{decoratorPrefix}phrase_#{translationId}#{decoratorSuffix}"

    $translate
  ]
]
