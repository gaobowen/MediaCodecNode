# MediaCodecNode

Multimedia processing service

## API
### svg to png
url `http://127.0.0.1:7001/svg/png?svgurl=/Users/gaobowen/Downloads/222.svg&w=1920&h=1080` 
receive `{"url":"/Users/gaobowen/Downloads/222.png"}`
sametime create a png file in input directory

### lottie to gif
url `http://127.0.0.1:7001/lottie/gif?lottieurl=/Users/gaobowen/Downloads/test2/lottie.json`
receive `{"url":"/Users/gaobowen/Downloads/test2/lottie.gif"}`
sametime create a gif file in input directory

## Run
### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```