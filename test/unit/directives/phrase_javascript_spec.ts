/// <reference path="../../../typings/index.d.ts" />
describe('phraseJavascript', () => {
  var autoLowercase, compiled, directive, elem, enabled, html, projectId, scope, window
  var $compile : ng.ICompileService
  //var $rootScope : ng.IRootScopeService
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
  autoLowercase = false
  projectId = "my-project-id"
  beforeEach(() => {
    angular.mock.module('phrase', function($provide) {
      window.jQuery.getScript = jasmine.createSpy("getScript")
      $provide.value('$window', window)
      $provide.value('phraseProjectId', projectId)
      $provide.value('phraseEnabled', enabled)
      $provide.value('phraseAutoLowercase', autoLowercase)
      return
    })
  })
  describe("phrase is disabled", () => {
    beforeEach(() => {
      enabled = false
    })
    beforeEach(() => {
      angular.mock.inject(function($injector) {
        var $rootScope
        $rootScope = $injector.get('$rootScope')
        $compile = $injector.get('$compile')
        scope = $rootScope.$new()
        elem = angular.element('<head><phrase-javascript></phrase-javascript></head>')
        compiled = $compile(elem)(scope)
        scope.$digest()
      })
    })
    it("should not attach the config", () => {
      expect(window.PHRASEAPP_CONFIG).toBeUndefined()
    })
    it("should not fetch the javascript snippet", () => {
      expect(window.jQuery.getScript).not.toHaveBeenCalled()
    })
  })
  describe("phrase is enabled", () => {
    beforeEach(() => {
      enabled = true
    })
    beforeEach(() => {
      angular.mock.inject(function($injector) {
        var $rootScope
        $rootScope = $injector.get('$rootScope')
        $compile = $injector.get('$compile')
        scope = $rootScope.$new()
        elem = angular.element('<head><phrase-javascript></phrase-javascript></head>')
        compiled = $compile(elem)(scope)
        scope.$digest()
      })
    })
    it("should fetch and evaluate the javascript snippet", () => {
      expect(window.jQuery.getScript).toHaveBeenCalled()
    })
    describe("configuration", () => {
      it("should attach the project id to the config object", () => {
        expect(window.PHRASEAPP_CONFIG.projectId).toEqual("my-project-id")
      })
      it("should attach the autoLowercase setting to the config object", () => {
        expect(window.PHRASEAPP_CONFIG.autoLowercase).toEqual(false)
      })
    })
  })
})
