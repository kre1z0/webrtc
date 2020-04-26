const moduleToCdn = require(`module-to-cdn`);

/** https://github.com/mastilver/module-to-cdn/blob/master/modules.json **/
module.exports = (name, version, opts) =>
  moduleToCdn(name, version, opts);
