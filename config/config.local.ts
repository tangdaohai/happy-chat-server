import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
  const bizConfig = {
    // jwt 相关配置
    jwt: {
      secretKey: 'happy-chat',
      // @FIXME 开发阶段设置为一年
      expiresIn: 1000 * 60 * 60 * 24 * 365
    }
  }
  const config: PowerPartial<EggAppConfig> = {}
  return {
    ...config,
    ...bizConfig
  }
}
