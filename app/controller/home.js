'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

var browser = {};

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }

    async lottiegif() {
        const { ctx, service } = this;
        let retobj = { url: '' };
        if (fs.existsSync(ctx.request.query.lottieurl)) {
            retobj.url = await service.lottie.gif(ctx.request.query.lottieurl);
        }
        ctx.body = retobj;
    }

    async svgpng() {
        const { ctx, service } = this;
        const svgurl = ctx.request.query.svgurl;
        let retobj = { url: '' };
        if (!fs.existsSync(svgurl)) {
            ctx.body = JSON.stringify(retobj);
            return;
        }
        let width = ctx.request.query.w;
        let height = ctx.request.query.h;
        width = parseInt(width);
        height = parseInt(height);
        retobj.url = await service.svg.png({
            filePath: svgurl,
            width: width,
            height: height,
        })
        ctx.body = retobj;
    }

    async svgjpeg() {
        const { ctx, service } = this;
        const svgurl = ctx.request.query.svgurl;
        let retobj = { url: '' };
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
            width: width,
            height: height,
        })
        ctx.body = retobj;
    }
}

module.exports = HomeController;
