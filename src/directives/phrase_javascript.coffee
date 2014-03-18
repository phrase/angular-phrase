phrase = angular.module "phrase"

phrase.directive "phraseJavascript", ["phrase.enabled", "phrase.authToken", "$window", (enabled, authToken, $window) ->
  restrict: "EA"
  replace: true
  link: () ->
    if enabled
      url = ['https://', 'phraseapp.com/assets/phrase/0.1/app.js?', new Date().getTime()].join('')
      $window.phrase_auth_token = authToken
      $.getScript(url)
]
