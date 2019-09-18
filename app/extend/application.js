const FFMPEGPATH = Symbol('Application#ffmpegPath');
const CHROMEPATH = Symbol('Application#chromePath');

module.exports = {
    get ffmpegPath() {
        if (!this[FFMPEGPATH]) {
            let ffmpegpath = this.config.ffmpegPathWindows;
            if (process.platform === 'linux') {
                ffmpegpath = this.config.ffmpegPathLinux;
            }
            else if (process.platform === 'darwin') {
                ffmpegpath = this.config.ffmpegPathMacOS;
            }
            this[FFMPEGPATH] = ffmpegpath;
        }
        return this[FFMPEGPATH];
    },
    get chromePath(){
        if (!this[CHROMEPATH]) {
            let chromePath = this.config.chromePathWindows;
            if (process.platform === 'linux') {
                chromePath = this.config.chromePathLinux;
            }
            else if (process.platform === 'darwin') {
                chromePath = this.config.chromePathMacOS;
            }
            this[CHROMEPATH] = chromePath;
        }
        return this[CHROMEPATH];
    },

};