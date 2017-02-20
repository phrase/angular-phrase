/// <reference path="../../typings/index.d.ts" />
describe("phrase", function () {
  beforeEach(function () {
    return angular.mock.module('phrase')
  })
  describe("$translate.instant()", function() {
    var $translate, interpolateParams, interpolationId, translationId
    $translate = null
    translationId = interpolateParams = interpolationId = null
    beforeEach(function () {
      translationId = "MY_KEY_NAME"
    })
    describe("phrase is enabled", function() {
      beforeEach(function() {
        angular.mock.module(function($provide) {
          $provide.value('phraseEnabled', true)
        })
        return angular.mock.inject(function($injector) {
          return $translate = $injector.get('$translate')
        })
      })
      it("should return a phrase decorated key name instead", () => {
        expect($translate.instant(translationId, interpolateParams, interpolationId)).toEqual("{{__phrase_MY_KEY_NAME__}}")
      })
    })
    describe("phrase is disabled", () => {
      beforeEach(() => {
        return angular.mock.module(function($provide) {
          $provide.value('phraseEnabled', false)
          return
        })
      })
      beforeEach(() => {
        return angular.mock.inject(($injector) => {
          return $translate = $injector.get('$translate')
        })
      })
      it("should return the key name instead", () => {
        expect($translate.instant(translationId, interpolateParams, interpolationId)).toEqual("MY_KEY_NAME")
      })
    })
  })
  describe("translate directive", () => {
    var elem, scope, $compile;
    $compile = null
    elem = null
    scope = null
    describe("phrase is enabled", () => {
      beforeEach(() => {
        angular.mock.module(function($provide) {
          $provide.value('phraseEnabled', true)
          return
        })
      })
      beforeEach(() => {
        angular.mock.inject(($injector) => {
          var $rootScope
          $rootScope = $injector.get('$rootScope')
          $compile = $injector.get('$compile')
          scope = $rootScope.$new()
        })
      })
      describe("translation id is within the attribute", () => {
        it("renders the key with phrase decorator", () => {
          var compiled
          elem = angular.element('<h1 translate="foo"></h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("{{__phrase_foo__}}")
        })
      })
      describe("translation id is within the text content", () => {
        it("renders the key with phrase decorator", () => {
          var compiled
          elem = angular.element('<h1 translate="">bar</h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("{{__phrase_bar__}}")
        })
      })
    })
    describe("phrase is disabled", () => {
      beforeEach(() => {
        angular.mock.module(function($provide) {
          $provide.value('phraseEnabled', false)
          return
        })
      })
      beforeEach(() => {
        angular.mock.inject(($injector) => {
          var $rootScope
          $rootScope = $injector.get('$rootScope')
          $compile = $injector.get('$compile')
          scope = $rootScope.$new()
        })
      })
      describe("translation id is within the attribute", () => {
        it("does not do anything", () => {
          var compiled
          elem = angular.element('<h1 translate="foo"></h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("foo")
        })
      })
      describe("translation id is within the text content", () => {
        it("does not do anything", () => {
          var compiled
          elem = angular.element('<h1 translate="">bar</h1>')
          compiled = $compile(elem)(scope)
          scope.$digest()
          expect(elem.html()).toEqual("bar")
        })
      })
    })
  })
})
