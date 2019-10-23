'use strict';

const Service = require('egg').Service;

const path = require('path');
const fs = require('fs');
const { SvgConverter } = require('lottie-image');

class SvgService extends Service {
  /**
   * svg to png
   * @param {object} args - 参数
   * @param {string} args.filePath - 输入路径
   * @param {number} args.width - 输出图像的宽
   * @param {number} args.height - 输出图像的高
   */
  async png(args) {
    const { filePath, width, height } = args;
    return await this.image({
      filePath,
      width,
      height,
      fileType: 'png',
    });
  }

  /**
   * svg to jpeg
   * @param {object} args - 参数
   * @param {string} args.filePath - 输入路径
   * @param {number} args.width - 输出图像的宽
   * @param {number} args.height - 输出图像的高
   */
  async jpeg(args) {
    const { filePath, width, height } = args;
    return await this.image({
      filePath,
      width,
      height,
      fileType: 'jpeg',
    });
  }

  /**
   * clip svg to png
   * @param {object} args - 参数
   * @param {string} args.filePath - 输入路径
   * @param {number} args.width - 输出图像的宽
   * @param {number} args.height - 输出图像的高
   * @param {object} args.clipData - svg clip data
   * @param {string} args.clipData.clipid - clip id
   * @param {string} args.clipData.imgPath - clip width
   * @param {number} args.clipData.imgw - clip width
   * @param {number} args.clipData.imgh - clip height
   * @param {number} args.clipData.imgx - clip offset x
   * @param {number} args.clipData.imgy - clip offset y
   * @param {number} args.clipData.imgr - clip rotate
   */
  async clip2png(args) {
    const { filePath, width, height, clipData } = args;
    return await this.image({
      filePath,
      width,
      height,
      fileType: 'png',
      clipData,
    });
  }

  /**
   * svg to image
   * @param {object} args - 参数
   * @param {string} args.filePath - 输入路径
   * @param {number} args.width - 输出图像的宽
   * @param {number} args.height - 输出图像的高
   * @param {number} args.fileType - 输出图像的格式
   * @param {object} args.clipData - svg clip data
   * @param {string} args.clipData.clipid - clip id
   * @param {string} args.clipData.imgPath - clip width
   * @param {number} args.clipData.imgw - clip width
   * @param {number} args.clipData.imgh - clip height
   * @param {number} args.clipData.imgx - clip offset x
   * @param {number} args.clipData.imgy - clip offset y
   * @param {number} args.clipData.imgr - clip rotate
   */
  async image(args) {
    const { filePath, width, height, fileType, clipData } = args;
    if (fs.existsSync(filePath)) {
      const cvter = new SvgConverter({
        chromePath: this.app.chromePath,
      });
      const pp = path.parse(filePath);
      const outpath = path.format({
        root: '/ignored',
        dir: pp.dir,
        base: pp.name + `.${fileType}`,
      });
      await cvter.svgSaveAs({
        filePath,
        outputPath: outpath,
        width,
        height,
        clipData,
      });
      if (fs.existsSync(outpath)) {
        return outpath;
      }
      return '';
    }
  }
}

module.exports = SvgService;
