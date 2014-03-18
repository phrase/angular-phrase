phrase = angular.module "phrase"

phrase.directive "phraseJavascript", ["phraseEnabled", "phraseAuthToken", "$window", (phraseEnabled, phraseAuthToken, $window) ->
  restrict: "EA"
  replace: true
  link: () ->
    if phraseEnabled
      url = ['https://', 'phraseapp.com/assets/phrase/0.1/app.js?', new Date().getTime()].join('')
      $window.phrase_auth_token = phraseAuthToken
      $window.jQuery.getScript(url)
]
