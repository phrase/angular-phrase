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

  describe "translate directive", ->
    $compile = null
    elem = null
    scope = null

    describe "phrase is enabled", ->
      beforeEach ->
        module ($provide) ->
          $provide.value('phraseEnabled', true)
          null

      beforeEach ->
        inject ($injector) ->
          $rootScope = $injector.get '$rootScope'
          $compile = $injector.get '$compile'
          scope = $rootScope.$new()

      describe "translation id is within the attribute", ->
        it "renders the key with phrase decorator", ->
          elem = angular.element('<h1 translate="foo"></h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("{{__phrase_foo__}}")

      describe "translation id is within the text content", ->
        it "renders the key with phrase decorator", ->
          elem = angular.element('<h1 translate="">bar</h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("{{__phrase_bar__}}")

    describe "phrase is disabled", ->
      beforeEach ->
        module ($provide) ->
          $provide.value('phraseEnabled', false)
          null

      beforeEach ->
        inject ($injector) ->
          $rootScope = $injector.get '$rootScope'
          $compile = $injector.get '$compile'
          scope = $rootScope.$new()

      describe "translation id is within the attribute", ->
        it "does not do anything", ->
          elem = angular.element('<h1 translate="foo"></h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("foo")

      describe "translation id is within the text content", ->
        it "does not do anything", ->
          elem = angular.element('<h1 translate="">bar</h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("bar")
