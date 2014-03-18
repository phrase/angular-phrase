describe 'phraseJavascript', ->
  scope = null
  elem = null
  directive = null
  compiled = null
  $compile = null
  html = null

  window = {
    jQuery: {}
  }
  enabled = null
  authToken = "my-auth-token"

  beforeEach ->
    module('phrase')
    module ($provide) ->
      window.jQuery.getScript = jasmine.createSpy("getScript")
      $provide.value('$window', window)
      $provide.value('phraseAuthToken', authToken)
      $provide.value('phraseEnabled', enabled)
      null

  describe "phrase is disabled", ->
    beforeEach ->
      enabled = false

    beforeEach ->
      inject ($injector) ->
        $rootScope = $injector.get '$rootScope'
        $compile = $injector.get '$compile'
        scope = $rootScope.$new()
        elem = angular.element('<head><phrase-javascript></phrase-javascript></head>')
        compiled = $compile(elem)(scope)
        scope.$digest()

    it "should not attach the auth token", ->
      expect(window.phrase_auth_token).toBeUndefined()

    it "should not fetch the javascript snippet", ->
      expect(window.jQuery.getScript).not.toHaveBeenCalled()

  describe "phrase is enabled", ->
    beforeEach ->
      enabled = true

    beforeEach ->
      inject ($injector) ->
        $rootScope = $injector.get '$rootScope'
        $compile = $injector.get '$compile'
        scope = $rootScope.$new()
        elem = angular.element('<head><phrase-javascript></phrase-javascript></head>')
        compiled = $compile(elem)(scope)
        scope.$digest()

    it "should attach the auth token as a global variable", ->
      expect(window.phrase_auth_token).toEqual("my-auth-token")

    it "should fetch and evaluate the javascript snippet", ->
      expect(window.jQuery.getScript).toHaveBeenCalled()
