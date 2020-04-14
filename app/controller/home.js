'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async lottiegif() {
    const { ctx, service } = this;
    try {
      const retobj = { url: '' };
      if (fs.existsSync(ctx.request.query.lottieurl)) {
        retobj.url = await service.lottie.gif(ctx.request.query.lottieurl);
      }
      ctx.body = retobj;
    } catch (error) {
      console.error(error);
    }
  }

  async svgpng() {
    const { ctx, service } = this;
    try {
      const svgurl = ctx.request.query.svgurl;
      const retobj = { pngurl: '' };
      if (!fs.existsSync(svgurl)) {
        ctx.body = JSON.stringify(retobj);
        return;
      }
      let width = ctx.request.query.w;
      let height = ctx.request.query.h;
      width = parseInt(width);
      height = parseInt(height);
      retobj.pngurl = await service.svg.png({
        filePath: svgurl,
        width,
        height,
      });
      ctx.body = retobj;
    } catch (error) {
      console.error(error);
    }

  }

  async svgjpeg() {
    const { ctx, service } = this;
    try {
      const svgurl = ctx.request.query.svgurl;
      const retobj = { url: '' };
      if (!fs.existsSync(svgurl)) {
        ctx.body = JSON.stringify(retobj);
        return;
      }
      let width = ctx.request.query.w;
      let height = ctx.request.query.h;
      width = parseInt(width);
      height = parseInt(height);
      retobj.url = await service.svg.jpeg({
        filePath: svgurl,
        width,
        height,
      });
      ctx.body = retobj;
    } catch (error) {
      console.error(error);
    }
  }

  async clipsvg() {
    const { ctx, service } = this;
    try {
      const {
        filePath,
        width,
        height,
        clipid,
        imgPath,
        imgw,
        imgh,
        imgx,
        imgy,
        imgr,
      } = ctx.request.body;
      const retobj = { url: '' };
      retobj.url = await service.svg.clip2png({
        filePath,
        width,
        height,
        clipData: {
          clipid,
          imgPath,
          imgw: parseFloat(imgw),
          imgh: parseFloat(imgh),
          imgx: parseFloat(imgx),
          imgy: parseFloat(imgy),
          imgr: parseFloat(imgr),
        },
      });
      ctx.body = retobj;
    } catch (error) {
      console.error(error);
    }

  }
}

module.exports = HomeController;
