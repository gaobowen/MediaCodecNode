'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/lottie/gif', controller.home.lottiegif);
  router.get('/svg/png', controller.home.svgpng);
  router.get('/svg/jpeg', controller.home.svgjpeg);
  router.get('/savepng', controller.home.svgpng);//兼容SvgToImageByNode

};
