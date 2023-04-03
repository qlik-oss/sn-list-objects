# Changelog for sn-filter-pane and sn-listbox

### [0.8.1](https://github.com/qlik-oss/sn-list-objects/compare/v0.8.0...v0.8.1) (2023-04-03)


### Bug Fixes

* fix keyboard navigation for folded listbox and folded listbox dropdown ([#246](https://github.com/qlik-oss/sn-list-objects/issues/246)) ([e06cdf6](https://github.com/qlik-oss/sn-list-objects/commit/e06cdf619b67087a0ba31e63a484552e1e92a30d))
* remove padding from witdth to prevent grow when resize ([#248](https://github.com/qlik-oss/sn-list-objects/issues/248)) ([e91b44e](https://github.com/qlik-oss/sn-list-objects/commit/e91b44e4882ccc74f18db653c79aa836060235c8))
* show selection toolbar when listbox opens in popover ([#237](https://github.com/qlik-oss/sn-list-objects/issues/237)) ([299d4b1](https://github.com/qlik-oss/sn-list-objects/commit/299d4b100a4d713f5d66755154cd151bba04f769))

## [0.8.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.7.0...v0.8.0) (2023-03-30)


### Features

* dont collapse single field grid layout ([#220](https://github.com/qlik-oss/sn-list-objects/issues/220)) ([db01000](https://github.com/qlik-oss/sn-list-objects/commit/db0100039c91a71783d0cc6764e03eca7e687dd2))


### Bug Fixes

* support keyboard navigation for collapsed mode ([#236](https://github.com/qlik-oss/sn-list-objects/issues/236)) ([fdcf3e1](https://github.com/qlik-oss/sn-list-objects/commit/fdcf3e14caefc79cf222393a29d0949d00261725))

## [0.7.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.6.1...v0.7.0) (2023-03-28)


### Features

* add sorting in simple edit mode ([#211](https://github.com/qlik-oss/sn-list-objects/issues/211)) ([ca26b65](https://github.com/qlik-oss/sn-list-objects/commit/ca26b65d672ec8e49e9e8b11dc253e6c397ecd50))


### Bug Fixes

* check theme if object should have borders ([#228](https://github.com/qlik-oss/sn-list-objects/issues/228)) ([96910c8](https://github.com/qlik-oss/sn-list-objects/commit/96910c8864434b0e25155b8fd869d69e0a3c92f7))
* ignore keydown in search input ([#210](https://github.com/qlik-oss/sn-list-objects/issues/210)) ([272fbcc](https://github.com/qlik-oss/sn-list-objects/commit/272fbcc180139e7abba6f1fb9119529c291d24dc))

### [0.6.1](https://github.com/qlik-oss/sn-list-objects/compare/v0.6.0...v0.6.1) (2023-03-23)

## [0.6.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.5.3...v0.6.0) (2023-03-23)


### Features

* add show title checkbox to pp ([#203](https://github.com/qlik-oss/sn-list-objects/issues/203)) ([7ba87d0](https://github.com/qlik-oss/sn-list-objects/commit/7ba87d0512ca5ceef55249a21b5a57b8b30c93e6))


### Bug Fixes

* close popover when selections confirmed or cancelled ([#202](https://github.com/qlik-oss/sn-list-objects/issues/202)) ([5be44e5](https://github.com/qlik-oss/sn-list-objects/commit/5be44e5d2f8743b3e0a4ce58baf24f7f51386d8e))
* remove labels from simple properties ([#197](https://github.com/qlik-oss/sn-list-objects/issues/197)) ([8555036](https://github.com/qlik-oss/sn-list-objects/commit/855503609c644b53007e14a65cde4f7125d010c6))
* resolve render tracker if zero listboxes ([#207](https://github.com/qlik-oss/sn-list-objects/issues/207)) ([bc3f78f](https://github.com/qlik-oss/sn-list-objects/commit/bc3f78f3fe4bded887084fd632468aec1abe4f74))
* wrong use of hooks ([#206](https://github.com/qlik-oss/sn-list-objects/issues/206)) ([34477a4](https://github.com/qlik-oss/sn-list-objects/commit/34477a481545f6b43096334e4455622099885fa5))

### [0.5.3](https://github.com/qlik-oss/sn-list-objects/compare/v0.5.2...v0.5.3) (2023-03-21)

### [0.5.2](https://github.com/qlik-oss/sn-list-objects/compare/v0.5.1...v0.5.2) (2023-03-21)


### Bug Fixes

* small screen listbox popover opens as a full window ([#186](https://github.com/qlik-oss/sn-list-objects/issues/186)) ([a685e57](https://github.com/qlik-oss/sn-list-objects/commit/a685e578d0a85b1a97ee8c5e4a52d73edfb9b2e2))

### [0.5.1](https://github.com/qlik-oss/sn-list-objects/compare/v0.5.0...v0.5.1) (2023-03-20)


### Bug Fixes

* await listbox renderings ([#171](https://github.com/qlik-oss/sn-list-objects/issues/171)) ([103e18a](https://github.com/qlik-oss/sn-list-objects/commit/103e18ad0ca471ca9cc10f629c93f12389e1468a))

## [0.5.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.4.2...v0.5.0) (2023-03-20)


### Features

* mark frequencyMax for master dim to be fetched later ([#155](https://github.com/qlik-oss/sn-list-objects/issues/155)) ([310be44](https://github.com/qlik-oss/sn-list-objects/commit/310be4450cbfa5880b61bacd2468d6814200ee98))


### Bug Fixes

* adaptive collapse height ([#154](https://github.com/qlik-oss/sn-list-objects/issues/154)) ([b84f666](https://github.com/qlik-oss/sn-list-objects/commit/b84f66613a112eb48f9697d343005522dfb1e578))
* add drill down icon ([#164](https://github.com/qlik-oss/sn-list-objects/issues/164)) ([f3f95ed](https://github.com/qlik-oss/sn-list-objects/commit/f3f95ed07d4ab5faf8d95152acf4b3bdef3e1945))
* don't use transparent background for popover ([#173](https://github.com/qlik-oss/sn-list-objects/issues/173)) ([02dc400](https://github.com/qlik-oss/sn-list-objects/commit/02dc400b0569f327810d54faf219d921d528dd0e))
* fields label ([#178](https://github.com/qlik-oss/sn-list-objects/issues/178)) ([0949d5b](https://github.com/qlik-oss/sn-list-objects/commit/0949d5b7af5e6f3ed31547ab4ae0554a50dfb5d3))
* **filter-pane:** rtl mode ([#142](https://github.com/qlik-oss/sn-list-objects/issues/142)) ([d038308](https://github.com/qlik-oss/sn-list-objects/commit/d038308b7caae04e9966b7701fa3f46b86ce50b2))
* fix setting focus on keyboard navigation ([#150](https://github.com/qlik-oss/sn-list-objects/issues/150)) ([f33d07f](https://github.com/qlik-oss/sn-list-objects/commit/f33d07ff0af17d6e680f78899ca9636c68c6d1fa))
* remove resize and increase width of the popover ([#168](https://github.com/qlik-oss/sn-list-objects/issues/168)) ([be9e1ad](https://github.com/qlik-oss/sn-list-objects/commit/be9e1adce7524e538c6fafe70b2fd09498863354))
* rename .js to .ts to get rid of build warning ([#157](https://github.com/qlik-oss/sn-list-objects/issues/157)) ([4c2a857](https://github.com/qlik-oss/sn-list-objects/commit/4c2a8576a9851bbcad5321b8c7b1ced77a030341))
* set title on correct property on conversion ([#143](https://github.com/qlik-oss/sn-list-objects/issues/143)) ([1de4cfc](https://github.com/qlik-oss/sn-list-objects/commit/1de4cfcac8b8d77ff25fa682933ddef6ffb8ff08))

### [0.4.2](https://github.com/qlik-oss/sn-list-objects/compare/v0.4.1...v0.4.2) (2023-03-15)


### Bug Fixes

* update frequency max on relating change ([#139](https://github.com/qlik-oss/sn-list-objects/issues/139)) ([92791d0](https://github.com/qlik-oss/sn-list-objects/commit/92791d056838a22a1b6344c8bb7e35368e6a544a))

### [0.4.1](https://github.com/qlik-oss/sn-list-objects/compare/v0.4.0...v0.4.1) (2023-03-14)


### Bug Fixes

* fix drop filed/measure to a filter pane ([#136](https://github.com/qlik-oss/sn-list-objects/issues/136)) ([335aff6](https://github.com/qlik-oss/sn-list-objects/commit/335aff666ffdc262bf88199bce9d47c55a7a12b9))
* get isSmallSize from sense ([#128](https://github.com/qlik-oss/sn-list-objects/issues/128)) ([2adda6a](https://github.com/qlik-oss/sn-list-objects/commit/2adda6ae40afe799eb2311a70a292b42b99c9dcc))

## [0.4.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.3.2...v0.4.0) (2023-03-09)


### Features

* bump nebula "3.3.0-alpha.0" ([#116](https://github.com/qlik-oss/sn-list-objects/issues/116)) ([6c1b211](https://github.com/qlik-oss/sn-list-objects/commit/6c1b2113120cf3c6d481f58e36779b1986cd9645))
* copy cell value context menu ([#112](https://github.com/qlik-oss/sn-list-objects/issues/112)) ([8c40688](https://github.com/qlik-oss/sn-list-objects/commit/8c406884fb224017656fea2eb9a7d0df413dde84))
* truncate title, use toggle search ([#110](https://github.com/qlik-oss/sn-list-objects/issues/110)) ([8f26439](https://github.com/qlik-oss/sn-list-objects/commit/8f2643972da32e113b89fbf7614c0dc0bd7867b5))


### Bug Fixes

* create stores for each filterpane ([#92](https://github.com/qlik-oss/sn-list-objects/issues/92)) ([319a7cd](https://github.com/qlik-oss/sn-list-objects/commit/319a7cd1a2d134891286ec234c9ed2c67ee50043))
* disable snapshot export & viewData ([#108](https://github.com/qlik-oss/sn-list-objects/issues/108)) ([4bf6312](https://github.com/qlik-oss/sn-list-objects/commit/4bf631252d602453ef12efda8898a398dc8f1d07))
* fix path for counting the number of dimensions ([#106](https://github.com/qlik-oss/sn-list-objects/issues/106)) ([090ae5d](https://github.com/qlik-oss/sn-list-objects/commit/090ae5d65c1e04ae89df270cdcaa31d7a46f052a))
* grid mode fixes ([#109](https://github.com/qlik-oss/sn-list-objects/issues/109)) ([50a86dd](https://github.com/qlik-oss/sn-list-objects/commit/50a86dd2c6b6e81f5a8678b24a764dade6b42660))
* remove getProperties request on selection ([#113](https://github.com/qlik-oss/sn-list-objects/issues/113)) ([80fd079](https://github.com/qlik-oss/sn-list-objects/commit/80fd079c0690439b97b3f6c7cadc9d57d640c135))
* set minimum number of dimensions to 1 ([#87](https://github.com/qlik-oss/sn-list-objects/issues/87)) ([c31161c](https://github.com/qlik-oss/sn-list-objects/commit/c31161cb449a9495f5cc612ef8d507954a1b6c9d))
* **sn-filter-pane:** adapt side panel properties ([#104](https://github.com/qlik-oss/sn-list-objects/issues/104)) ([9bd1e51](https://github.com/qlik-oss/sn-list-objects/commit/9bd1e5157b09c6818afad5b648640a9bbc2a658c))
* update sn-listbox to be in the [@nebula](https://github.com/nebula).js namespace ([#50](https://github.com/qlik-oss/sn-list-objects/issues/50)) ([e55fd94](https://github.com/qlik-oss/sn-list-objects/commit/e55fd940aa09b64baa2e01accd8db787c453a8fe))

### [0.3.2](https://github.com/qlik-oss/sn-list-objects/compare/v0.3.1...v0.3.2) (2023-02-28)

### [0.3.1](https://github.com/qlik-oss/sn-list-objects/compare/v0.3.1-No.0...v0.3.1) (2023-02-27)

## [0.3.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.2.0...v0.3.0) (2023-02-27)


### Features

* add searchEnabled property ([#46](https://github.com/qlik-oss/sn-list-objects/issues/46)) ([db4c1c2](https://github.com/qlik-oss/sn-list-objects/commit/db4c1c29d8a7f333b3d18ed96c0adb0408ef46cc))
* add wildcard property ([#45](https://github.com/qlik-oss/sn-list-objects/issues/45)) ([ac3c442](https://github.com/qlik-oss/sn-list-objects/commit/ac3c442ed9fb9acd2dde880afa5b9c15ab65b2bc))
* signal selection event to sense-client ([#47](https://github.com/qlik-oss/sn-list-objects/issues/47)) ([cf8657f](https://github.com/qlik-oss/sn-list-objects/commit/cf8657f2de821adcaa90cd019ce09d6b829bdcb6))
* toggle search ([#38](https://github.com/qlik-oss/sn-list-objects/issues/38)) ([3d82670](https://github.com/qlik-oss/sn-list-objects/commit/3d82670512d6ad2134b86d189638d80dee09afe7))


### Bug Fixes

* more type fixes ([#52](https://github.com/qlik-oss/sn-list-objects/issues/52)) ([405e6a1](https://github.com/qlik-oss/sn-list-objects/commit/405e6a13db80009c7ef79789c176cc5fe1cf2abd))
* some type fixes ([#51](https://github.com/qlik-oss/sn-list-objects/issues/51)) ([a7c8a38](https://github.com/qlik-oss/sn-list-objects/commit/a7c8a38ed3b16b9167bf4229ca1855f2c8f64397))

## [0.2.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.1.0...v0.2.0) (2023-01-31)


### Features

* add chart conversion setup ([#42](https://github.com/qlik-oss/sn-list-objects/issues/42)) ([0da155e](https://github.com/qlik-oss/sn-list-objects/commit/0da155e039bbdd9dd45fabafcf521f1409c21b40))
* add checkbox and histogram to property panel ([#36](https://github.com/qlik-oss/sn-list-objects/issues/36)) ([fd35401](https://github.com/qlik-oss/sn-list-objects/commit/fd35401cee4e528d0c71690508c6caa4eb24311b))
* add dense mode ([#21](https://github.com/qlik-oss/sn-list-objects/issues/21)) ([2a1ee77](https://github.com/qlik-oss/sn-list-objects/commit/2a1ee7761b1874f85f78da115d5703303e8fc76a))
* add dense option to each individual listbox ([#23](https://github.com/qlik-oss/sn-list-objects/issues/23)) ([743e423](https://github.com/qlik-oss/sn-list-objects/commit/743e42381f8e2565a56ad53d3e389ee0536a3e67))
* add direction listboxOptions ([#33](https://github.com/qlik-oss/sn-list-objects/issues/33)) ([9e8ef94](https://github.com/qlik-oss/sn-list-objects/commit/9e8ef943b1f3d0affd05abec8084e0eb85286bb2))
* add textAlign property ([#29](https://github.com/qlik-oss/sn-list-objects/issues/29)) ([9b5d3b3](https://github.com/qlik-oss/sn-list-objects/commit/9b5d3b308fd750a58d1bedc1a523d0e71964d856))
* apply sense theme ([#34](https://github.com/qlik-oss/sn-list-objects/issues/34)) ([f578388](https://github.com/qlik-oss/sn-list-objects/commit/f57838821baa6f081a4db6d06e340872a88fb0a1))
* import&export properties chart conversion ([#43](https://github.com/qlik-oss/sn-list-objects/issues/43)) ([2591967](https://github.com/qlik-oss/sn-list-objects/commit/259196757567554f7047672251720a6c2a21fa2f))
* popover container ([#24](https://github.com/qlik-oss/sn-list-objects/issues/24)) ([e64a30c](https://github.com/qlik-oss/sn-list-objects/commit/e64a30c8cc1ead7a819345b9c88db0147dfef4f4))
* use resource store ([#31](https://github.com/qlik-oss/sn-list-objects/issues/31)) ([c5b4b05](https://github.com/qlik-oss/sn-list-objects/commit/c5b4b0564f618ab457e4a6f51ffc9dcd727b1b91))


### Bug Fixes

* adapt to grid mode ([#28](https://github.com/qlik-oss/sn-list-objects/issues/28)) ([e1e156c](https://github.com/qlik-oss/sn-list-objects/commit/e1e156cba58a51e11110284466a8e4aa0512effb))
* frequecyMode in sn-listbox ([#35](https://github.com/qlik-oss/sn-list-objects/issues/35)) ([26ec130](https://github.com/qlik-oss/sn-list-objects/commit/26ec130829886655ec04a929d76a7c1d4027b18e))
* frequency enabled ([#30](https://github.com/qlik-oss/sn-list-objects/issues/30)) ([aa3bcf0](https://github.com/qlik-oss/sn-list-objects/commit/aa3bcf0d4596a021960ad0ac40ed03cb05a85473))
* ts and lint errors/warnings ([#39](https://github.com/qlik-oss/sn-list-objects/issues/39)) ([e302159](https://github.com/qlik-oss/sn-list-objects/commit/e3021596c9a41f6f1be4b20a279a0d244f0c8256))
* tweak grid layout ([#27](https://github.com/qlik-oss/sn-list-objects/issues/27)) ([5ba6090](https://github.com/qlik-oss/sn-list-objects/commit/5ba609023cb21232302c879eb0d7d913b106f36a))

## [0.1.0](https://github.com/qlik-oss/sn-list-objects/compare/v0.1.0-alpha.1...v0.1.0) (2022-11-14)

## [0.1.0-alpha.1](https://github.com/qlik-oss/sn-list-objects/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2022-11-07)

## 0.1.0-alpha.0 (2022-11-07)


### Features

* add jest setup unit testing ([#15](https://github.com/qlik-oss/sn-list-objects/issues/15)) ([f474e40](https://github.com/qlik-oss/sn-list-objects/commit/f474e409f389407541ffc5a08bdc130a03a8a6c4))
* render Listbox in a popover ([#2](https://github.com/qlik-oss/sn-list-objects/issues/2)) ([21ebba8](https://github.com/qlik-oss/sn-list-objects/commit/21ebba81cb5b5fd19c5452469e70bacf7748f866))


### Bug Fixes

* filterpane indentation ([#16](https://github.com/qlik-oss/sn-list-objects/issues/16)) ([9def0d8](https://github.com/qlik-oss/sn-list-objects/commit/9def0d88e6ca682ba86385afa0e813d3278d5f06))
* warning ([#6](https://github.com/qlik-oss/sn-list-objects/issues/6)) ([b7a2cf5](https://github.com/qlik-oss/sn-list-objects/commit/b7a2cf5d8603d89580c421e810c9baf93f95c1f5))