# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.1.6 - 2020-07-21
### Changed
- update all dependencies, remove potential security issues
- update angular 1.7.9 -> 1.8.0


## 2.1.4 - 2019-10-17
### Added
- `.editorconfig` file with editor rules
- `eslint` with `.eslintrc` file
- `tsconfig.json` for TS configuration
- `ts-loader`
- `DataUtils.getScript()` replacing `jquery.getScript()` method

### Changed
- `karma` configuration, with upgrading version from `1.5.0` => `4.3.0`
- `webpack` configuration, with upgrade version `2.2.1` => `4.41.0`
- `typescript` version `2.2.1` => `3.6.4`
- `travis` build
- refactor `angular-phrase.ts` main file
- refactor all spec files

### Removed
- old `typings.json` file
- `jquery` dependency
- packages `awesome-typescript-loader`, `jasmine`, `jasmine-core`

