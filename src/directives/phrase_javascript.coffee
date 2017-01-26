phrase = angular.module "phrase"

phrase.directive "phraseJavascript", ["phraseEnabled", "phraseProjectId", "phraseAutoLowercase", "$window", (phraseEnabled, phraseProjectId, phraseAutoLowercase, $window) ->
  restrict: "EA"
  replace: true
  link: () ->
    if phraseEnabled
      url = ['https://', 'phraseapp.com/assets/in-context-editor/2.0/app.js?', new Date().getTime()].join('')
      $window.PHRASEAPP_CONFIG = {
        projectId: phraseProjectId,
        autoLowercase: phraseAutoLowercase,
      }
      $window.jQuery.getScript(url)
]
