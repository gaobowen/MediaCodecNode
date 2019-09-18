'use strict';

const Service = require('egg').Service;
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

class FfmpegService extends Service {
    
    async getffmpegpath() {
        let ffmpegpath = this.app.config.ffmpegPathWindows;
        if (process.platform === 'linux') {
            ffmpegpath = this.app.config.ffmpegPathLinux;
        }
        else if (process.platform === 'darwin') {
            ffmpegpath = this.app.config.ffmpegPathMacOS;
        }
        return ffmpegpath;
    }

    async buildmov(args = {}) {
        if (args.movpath === undefined
            || args.framerate === undefined) {
            return;
        }       
        let ffmpegpath = await this.getffmpegpath();
        const ffmpegargs = [
            '-v', 'error',
            `-y`,
            '-framerate', `${args.framerate}`,
            '-f', 'image2pipe',
            '-i', '-',          
            //'-c:v', 'png',           
            `${args.movpath}`,
        ];

        // const ffmpegargs = [
        //     ` -v error -y -framerate ${args.framerate} -f image2pipe -i - ${args.movpath}`
        // ];
        return cp.spawn(`${ffmpegpath}`, ffmpegargs, { cwd: null, env: null });
    }

    async buildgif(args = {}) {
        if (args.movpath === undefined
            || args.framerate === undefined) {
            return;
        }
        if (fs.existsSync(args.movpath)) {
            var pp = path.parse(args.movpath);
            let palpath = path.format({
                root: '/ignored',
                dir: pp.dir,
                base: pp.name + `-pal.png`
            });
            let gifpath = path.format({
                root: '/ignored',
                dir: pp.dir,
                base: pp.name + `.gif`
            });
            let ffmpegpath = await this.getffmpegpath();
            let palcmd = `${ffmpegpath} -v error -i ${args.movpath} -vf "fps=${args.framerate},scale=-1:-1:flags=lanczos,palettegen" -y ${palpath}`
            let gifcmd = `${ffmpegpath} -v error -i ${args.movpath} -i ${palpath} -loop ${0} -lavfi "fps=${args.framerate},scale=-1:-1:flags=lanczos [x]; [x][1:v] paletteuse" -y ${gifpath}`
            
            await cp.execSync(palcmd);
            await cp.execSync(gifcmd);
            //console.log('buildgif');
            //cproc.stdin.end();
            if (fs.existsSync(gifpath)) {
                return gifpath;
            }
        }
        else{
            console.log(args.movpath + "not exsit")
        }
    }
}

module.exports = FfmpegService;
