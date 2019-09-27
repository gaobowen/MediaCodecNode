'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
const { LottieConverter } = require('lottie-image');

class LottieService extends Service {
  async gif(filepath) {
    if (fs.existsSync(filepath)) {
      const cvter = new LottieConverter({
        chromePath: this.app.chromePath,
        ffmpegPath: this.app.ffmpegPath,
      });
      const pp = path.parse(filepath);
      const outpath = path.format({
        root: '/ignored',
        dir: pp.dir,
        base: pp.name + '.gif',
      });
      await cvter.saveAs({
        lottiePath: filepath,
        outputPath: outpath,
      });
      if (fs.existsSync(outpath)) {
        return outpath;
      }
      return '';
    }
  }

  async apng(filepath) {
    if (fs.existsSync(filepath)) {
      const cvter = new LottieConverter({
        chromePath: this.app.chromePath,
        ffmpegPath: this.app.ffmpegPath,
      });
      const pp = path.parse(filepath);
      const outpath = path.format({
        root: '/ignored',
        dir: pp.dir,
        base: pp.name + '.apng',
      });
      await cvter.saveAs({
        lottiePath: filepath,
        outputPath: outpath,
      });
      if (fs.existsSync(outpath)) {
        return outpath;
      }
      return '';
    }
  }
}

module.exports = LottieService;
