# angular-phrase

[![Build Status](https://travis-ci.org/phrase/angular-phrase.png)](https://travis-ci.org/phrase/angular-phrase)

angular-phrase is an addon for [angular-translate](https://github.com/angular-translate/angular-translate) that lets you connect localized AngularJS applications to the PhraseApp In-Context editor.

## Prerequisites

To use angular-phrase with your application you have to:

* Sign up for a PhraseApp account: [https://phraseapp.com/en/signup](https://phraseapp.com/en/signup)
* Use the excellent [angular-translate](https://github.com/angular-translate/angular-translate) module by Pascal Precht for localization in your AngularJS app
* Have jQuery included

## Demo

*coming soon.*

## Install

### Install angular-phrase via Bower:

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

	myApp.value("phraseAuthToken", "MY-AUTH-TOKEN");
	myApp.value("phraseEnabled", true);
	myApp.value("phraseDecoratorPrefix", "{{__");
	myApp.value("phraseDecoratorSuffix", "__}}");

### Javascript snippet

Add the `phrase-javascript` directive within your application, usually best within the `<head>`:

    <phrase-javascript></phrase-javascript>

If this does not work for you, you can also integrate the [Javscript snippet manually](https://phraseapp.com/docs/installation/phrase-javascript).


## How does it work?

Once the module is enabled it will:

* override the $translate service and provide placeholders that can be picked up by the PhraseApp [In-Context-Editor](https://phraseapp.com/en/features/in-context-editor)

* fetch the Javascript application used to render the In-Context editor on top of your application


## TODO

* ~~Add support for `translate` filter~~
* Add support for `translate` directive
* Add support for interpolation values


## Support

**Question?** File a support ticket at: [support.phraseapp.com](http://support.phraseapp.com)

**Issue?** use GitHub issues and share the problem


## Test

Run unit tests using grunt/Karma:

    grunt karma:unit
