import { EggPlugin } from 'egg'
const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  session: false,
  jsonp: false,
  i18n: false,
  schedule: false,
  view: false
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
}

export default plugin
