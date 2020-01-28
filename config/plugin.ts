import { EggPlugin } from 'egg'
const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  }
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
}

export default plugin
