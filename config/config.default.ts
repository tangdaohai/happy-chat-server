import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580018754080_4309'

  // add your egg config in here
  config.middleware = ['jwt']

  // 错误信息以 json 格式返回
  config.onerror = {
    accepts () {
      return 'json'
    }
  }

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
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    // 此配置按环境去设置
    jwt: {
      secretKey: '',
      // @FIXME 开发阶段设置为一年
      expiresIn: 0,
      ignore: ['/api/v1/user/sign-in', '/api/v1/user/sign-up']
    }
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
