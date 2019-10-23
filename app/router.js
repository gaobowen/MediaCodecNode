'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // svg 参数校验中间件
  const svgmw = app.middleware.svgVerify();

  router.get('/', controller.home.index);
  router.get('/lottie/gif', controller.home.lottiegif);
  router.get('/svg/png', svgmw, controller.home.svgpng);
  router.get('/svg/jpeg', svgmw, controller.home.svgjpeg);
  router.post('/clipsvg', controller.home.clipsvg);
  router.get('/savepng', svgmw, controller.home.svgpng);// 兼容老版本SvgToImageByNode

};
