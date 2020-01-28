import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580018754080_4309'

  // add your egg config in here
  config.middleware = []

  // mongodb
  config.mongoose = {
    url: 'mongodb://localhost:27017',
    options: {
      user: 'happychat',
      pass: '123456',
      dbName: 'happy-chat'
    }
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  }

  config.security = {
    csrf: {
      enable: false
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  }
}
