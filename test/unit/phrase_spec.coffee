describe "phrase", ->

  beforeEach ->
    module('phrase')

  describe "$translate.instant()", ->
    $translate = null

    translationId = interpolateParams = interpolationId = null

    beforeEach ->
      translationId = "MY_KEY_NAME"

    describe "phrase is enabled", ->
      beforeEach ->
        module ($provide) ->
          $provide.value('phraseEnabled', true)
          null

        inject ($injector) ->
          $translate = $injector.get '$translate'

      it "should return a phrase decorated key name instead", ->
        expect($translate.instant(translationId, interpolateParams, interpolationId)).toEqual("{{__phrase_MY_KEY_NAME__}}")

    describe "phrase is disabled", ->
      beforeEach ->
        module ($provide) ->
          $provide.value('phraseEnabled', false)
          null

        inject ($injector) ->
          $translate = $injector.get '$translate'

      it "should return the key name instead", ->
        expect($translate.instant(translationId, interpolateParams, interpolationId)).toEqual("MY_KEY_NAME")
