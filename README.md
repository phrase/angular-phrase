# angular-phrase

[![Build Status](https://travis-ci.org/phrase/angular-phrase.png)](https://travis-ci.org/phrase/angular-phrase)

angular-phrase is an addon for [angular-translate](https://github.com/angular-translate/angular-translate) that lets you connect localized AngularJS applications to the PhraseApp In-Context Editor.

## Prerequisites

To use angular-phrase with your application you have to:

* Sign up for a PhraseApp account: [https://phraseapp.com/en/signup](https://phraseapp.com/en/signup)
* Use the excellent [angular-translate](https://github.com/angular-translate/angular-translate) module by Pascal Precht for localization in your AngularJS app
* Have jQuery included

## Demo

E-Mail: demo@phraseapp.com

Password: phrase

[http://angular-phrase-demo.herokuapp.com/](http://angular-phrase-demo.herokuapp.com/)

(Find the source code for the demo on GitHub: [angular-phrase-demo](https://github.com/phrase/angular-phrase-demo)

## Installation

### via NPM:

    npm install angular-phrase

### via Bower:

    bower install angular-phrase

(or download it manually from the `dist` folder)

### Build form source

You can also build it directly from source to get the latest and greatest:

    grunt build

### Add the module

Add angular-phrase module to your existing AngularJS application _after_ loading the `angular-translate` module:

	var myApp = angular.module("myApp", ['pascalprecht.translate', 'phrase'])

### Configure

Configure the module:

	myApp.value("phraseProjectId", "YOUR-PROJECT-ID");
	myApp.value("phraseEnabled", true);
	myApp.value("phraseDecoratorPrefix", "{{__");
	myApp.value("phraseDecoratorSuffix", "__}}");

You can find the Project-ID in the Project overview in the PhraseApp Translation Center

### JavaScript snippet

Add the `phrase-javascript` directive within your application, usually best within the `<head>`:

    <phrase-javascript></phrase-javascript>

If this does not work for you, you can also integrate the [JavaScript snippet manually](http://docs.phraseapp.com/guides/in-context-editor/custom-integration/).

## How does it work?

Once the module is enabled it will:

* override the $translate service and provide placeholders that can be picked up by the PhraseApp [In-Context Editor](https://phraseapp.com/features)

* fetch the JavaScript application used to render the In-Context Editor on top of your application

## Using AngularJS with phraseapp-in-context-editor-ruby gem or any other server side technology

If you use the angular-phrase plugin in combination with the phraseapp-in-context-editor-ruby gem or another server side technology that enables the In-Context Editor, AngularJS might have problems if you use curly braces as the decorator suffix/prefix since AngularJS thinks that youre decoratated keys are AngularJS directives (which is not the case).

You can easily solve this issue by using a different decorator syntax for your setup:

#### angular-phrase configuration

    app.value("phraseDecoratorPrefix", "[[__");
    app.value("phraseDecoratorSuffix", "__]]");

#### phraseapp-in-context-editor-ruby gem configuration

    PhraseApp::InContextEditor.prefix = "[[__"
    PhraseApp::InContextEditor.suffix = "__]]"

#### JavaScript configuration

    window.PHRASEAPP_CONFIG = {
      prefix: '[[__',
      suffix: "__]]"
    }

*This is only necessary if you're not using the phraseJavascript` directive*

## TODO

* [x] Add support for `translate` filter
* [x] Add support for `translate` directive
* [ ] Add support for interpolation values

## Support

**Question?** Contact us at: [phraseapp.com/contact](https://phraseapp.com/contact)

**Issue?** use GitHub issues and share the problem

## Test

Run unit tests using grunt/Karma:

    grunt karma:unit
