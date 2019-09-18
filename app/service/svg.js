'use strict';

const Service = require('egg').Service;

const path = require('path');
const fs = require('fs');
const { SvgConverter } = require('lottie-image');

class SvgService extends Service {
    /**
     * svg to png
     * @param {object} args 
     * @param {string} args.filePath - 输入路径
     * @param {number} args.width - 输出图像的宽
     * @param {number} args.height - 输出图像的高
     */
    async png(args) {
        const { filePath, width, height } = args;
        return await this.image({
            filePath: filePath,
            width: width,
            height: height,
            filetype: 'png',
        });
    }

    /**
     * svg to jpeg
     * @param {object} args 
     * @param {string} args.filePath - 输入路径
     * @param {number} args.width - 输出图像的宽
     * @param {number} args.height - 输出图像的高
     */
    async jpeg(args) {
        const { filePath, width, height } = args;
        return await this.image({
            filePath: filePath,
            width: width,
            height: height,
            filetype: 'jpeg',
        });
    }

    /**
     * svg to image
     * @param {object} args 
     * @param {string} args.filePath - 输入路径
     * @param {number} args.width - 输出图像的宽
     * @param {number} args.height - 输出图像的高
     * @param {number} args.filetype - 输出图像的格式
     */
    async image(args) {
        const { filePath, width, height, filetype } = args;
        if (fs.existsSync(filePath)) {
            let cvter = new SvgConverter({
                chromePath: this.app.chromePath,
            });
            let pp = path.parse(filePath);
            let outpath = path.format({
                root: '/ignored',
                dir: pp.dir,
                base: pp.name + `.${filetype}`
            });
            await cvter.svgSaveAs({
                filePath: filePath,
                outputPath: outpath,
                width: width,
                height: height,
            });
            if (fs.existsSync(outpath)) {
                return outpath;
            }
            return '';
        }
    }
}

module.exports = SvgService;
