const fs = require('fs');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

function resolve(dir) {
  return path.join(__dirname, dir);
}

const envFile = resolve('.env');

const dotenvFiles = [`${envFile}.${NODE_ENV}.env`].filter(Boolean);

dotenvFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: file,
      })
    );
  }
});

const raw = Object.keys(process.env)
  .filter((key) => /^(VUE_APP_)/.test(key))
  .reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {});

const stringified = Object.keys(raw).reduce((env, key) => {
  env[key] = JSON.stringify(raw[key]);
  return env;
}, {});

module.exports = stringified;
