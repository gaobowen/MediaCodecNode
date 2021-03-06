/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567663270812_5752';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // repalce with your own file path
    chromePathWindows: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    chromePathLinux: '/opt/google/chrome/chrome',
    chromePathMacOS: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ffmpegPathWindows: 'ffmpeg',
    ffmpegPathLinux: '/data/mylib/ffmpeg',
    ffmpegPathMacOS: '/Users/gaobowen/Downloads/test2/ffmpeg',
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '',
    },
  };

  config.security = {
    csrf: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
