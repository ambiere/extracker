## [0.2.1](https://github.com/zhid0399123/extracker/compare/0.2.0...0.2.1) (2023-12-19)

### Bug Fixes

- **assets/style:** playground padding-inline to avoid inputs outline onfocus being cut on edge ([398259a](https://github.com/zhid0399123/extracker/commit/398259a40cbf822077073805ca81eff8564ab7f5))

## [0.2.0](https://github.com/zhid0399123/extracker/compare/0.1.0...0.2.0) (2023-12-19)

### Features

- **assets/index:** updated endpoints, dynamically add action on exercise and logs form, clear the form input after 250 ([1af28f0](https://github.com/zhid0399123/extracker/commit/1af28f0962bce2d42f0a8dd66ed8e931ae0e3c9b))
- **assets/style:** updated styles ([5d7efd3](https://github.com/zhid0399123/extracker/commit/5d7efd36889f0f2a4c7b547506a1544a4f339ec9))
- **middleware/errorHandler:** handle exercise not found ([fec872f](https://github.com/zhid0399123/extracker/commit/fec872f6c0ccd873ec2d249a7cd1d1fc3549df89))
- **public/index:** added playground feat ([486c5c4](https://github.com/zhid0399123/extracker/commit/486c5c4939cb7119a877c47f67a4a718fd816afe))
- **routes/auth:** changed authenticate endpoint method to POST ([1242386](https://github.com/zhid0399123/extracker/commit/124238695cb8397aef898e886c3d8c871334afdd))
- **routes/exercises:** added endpoint to retrieve user exercise ([a100794](https://github.com/zhid0399123/extracker/commit/a10079446df9317655dde6303c9c8216f1606eca))
- **service/collection:** count documents from collection and return ([cbef6c0](https://github.com/zhid0399123/extracker/commit/cbef6c05644881a01d03b9d9f5397ac359a8ae42))

## [0.1.0](https://github.com/zhid0399123/extracker/compare/a30aff25fb06d129693f9ede74c0f81bf4266bf1...0.1.0) (2023-12-15)

### Features

- **.dockerignore:** updated .dockerignore ([07a406f](https://github.com/zhid0399123/extracker/commit/07a406fa77f7404269f4ba793a3c863ce985cd84))
- **.env.sample:** updated .env.sample ([1cf2bcd](https://github.com/zhid0399123/extracker/commit/1cf2bcd46a3fbfcb31fae9af69191e8ba837b1f7))
- **.gitignore:** updated .gitignore ([c44da5c](https://github.com/zhid0399123/extracker/commit/c44da5cbde22fb9333b1e6f5ec982cc3f780e3e1))
- **auth:** added /register endpoint to handle user registration ([50598ef](https://github.com/zhid0399123/extracker/commit/50598efc78595995cb001afba7337f721a2a8dbd))
- **bin:** server entry point ([0752edd](https://github.com/zhid0399123/extracker/commit/0752eddc00b63b5a70cd6506288db5b604a3d54f))
- **collection:** module exporting util fn to facilitate read and write operation to our mongodb ([f846049](https://github.com/zhid0399123/extracker/commit/f846049781cd14895229b93acbd7278d85544e53))
- **commitizen:** configured commitizen ([68e7110](https://github.com/zhid0399123/extracker/commit/68e7110d550dbb6ade5991ad07c5ec8774e38695))
- **docker-helper:** dockerode module containing util fn for mongo container manipulation ([c449c31](https://github.com/zhid0399123/extracker/commit/c449c31d1477048e2fd06bee124eeaa2e9bfc27d))
- **errorHandler:** custom error handler middleware ([1692baf](https://github.com/zhid0399123/extracker/commit/1692baf899532cad1bc29cb0d54385d51ba975c0))
- **generateHash:** hash user credential (password) ([8817512](https://github.com/zhid0399123/extracker/commit/881751216b91bd6e111bc38ba13b67dc79b7649d))
- **index.html:** added html static page ([293d2c7](https://github.com/zhid0399123/extracker/commit/293d2c729ff9ad105c5157c359a2b4e50dd152e2))
- **index.js:** added js script for index page ([7802277](https://github.com/zhid0399123/extracker/commit/780227705778937a4940ca0bc33862c49df24d37))
- **lint-staged:** configured lint-staged ([ecc25ce](https://github.com/zhid0399123/extracker/commit/ecc25ce2db67209dab9b82f3cd5894369c1c63aa))
- **loggerOptions:** options for custom http request logger: pino-http ([b25f5da](https://github.com/zhid0399123/extracker/commit/b25f5dabd763993af93f1a057a71fe14931f044e))
- **middleware/authentication:** middleware to authenticate user when requesting for exercises addition and exercise logs ([cfd7607](https://github.com/zhid0399123/extracker/commit/cfd7607d8c9711a01d674a1e29754506cd767010))
- **middleware/errorHandler:** handle errors thrown by our server and respond to the client ([f80aeff](https://github.com/zhid0399123/extracker/commit/f80aeffe84dfa075ac33be2793d4a901293043a2))
- **mongodb:** module exporting functions to ease connection and closing connection to mongodb using MongoClient Driver ([3bb258f](https://github.com/zhid0399123/extracker/commit/3bb258fafbfc0df1cee68e5818b16f7424467766))
- **package:** Initialized project ([6a7e020](https://github.com/zhid0399123/extracker/commit/6a7e0207818d14be57072379bd436a7d3df39503))
- **package:** Initialized project ([7473b6c](https://github.com/zhid0399123/extracker/commit/7473b6c45e4464a3ac31496e2165bdda51bb0cad))
- **package:** Initialized project ([a30aff2](https://github.com/zhid0399123/extracker/commit/a30aff25fb06d129693f9ede74c0f81bf4266bf1))
- **prettier:** configured vs-code formatter ([d8116b1](https://github.com/zhid0399123/extracker/commit/d8116b1d0acf7a297e2f49e05d32218502e776f3))
- **processFilterOperations:** process collection.find() query filter operation for date ranges ($gte and $lte) ([c30eac5](https://github.com/zhid0399123/extracker/commit/c30eac572b73eaeb6660480178b22eabe73e3875))
- **routeNotFound:** middleware to handle unknown endpoints ([cc7083c](https://github.com/zhid0399123/extracker/commit/cc7083ced2d9ce37435dba3e626c1e1ed34ab77f))
- **routes/auth:** added authentication route. user can authenticate their credentials ([099e6eb](https://github.com/zhid0399123/extracker/commit/099e6eb765556ac0b6a23b5218c2ae1bd18f9e0d))
- **routes/exercises:** router that handles all the user exercises request i.e adding exercises and exercises log ([9dc0aff](https://github.com/zhid0399123/extracker/commit/9dc0aff2a1712ecb279428e754c7af5b7394a425))
- **routes/index:** return index.html page ([7cd9eda](https://github.com/zhid0399123/extracker/commit/7cd9eda93e10d9418ab4e77e9ddca0269eb598e9))
- **run-after:** stop mongo container after test ([930a486](https://github.com/zhid0399123/extracker/commit/930a4867768c555c34f4252c45c3b579aa2d648c))
- **run-before:** start mongo container before test ([b02423c](https://github.com/zhid0399123/extracker/commit/b02423cb73e5012c03bb8be9cabc5a7a73c0df14))
- **server/server:** configured routers, logger and express middleware (json(), urlencoded()) ([2066167](https://github.com/zhid0399123/extracker/commit/2066167d75d9af9f1a65290d6a4a986e9dd060f9))
- **server:** extracker server module ([9aa4661](https://github.com/zhid0399123/extracker/commit/9aa4661ebd8e770b88d87b2ce4785e8b3cd5cbdd))
- **serverStartUpLog:** logs info when server start ([c56a0a7](https://github.com/zhid0399123/extracker/commit/c56a0a7a6a56df0ba43d6ed767c50bc0f1793f73))
- **services/mongodb:** getDatabase returns db and MongoClient instance. added method to generate ObjectId ([3082bcb](https://github.com/zhid0399123/extracker/commit/3082bcbf7d6f4429a01953dbe1bcc0bf73d6284c))
- **style:** added styles for index page ([c226f8e](https://github.com/zhid0399123/extracker/commit/c226f8ea1c84c8dab5e15760d3cee118a9b0ff77))
