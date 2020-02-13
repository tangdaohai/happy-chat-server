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
  io: {
    enable: true,
    package: 'egg-socket.io'
  },
  session: false,
  jsonp: false,
  i18n: false,
  schedule: false,
  view: false
}

export default plugin
