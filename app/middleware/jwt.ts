import { Context, EggAppConfig } from 'egg'
import { verify } from 'jsonwebtoken'
/**
 * Json Web Token
 */
export default (options: EggAppConfig['jwt']): any => {
  return async function (ctx: Context, next) {
    // 判断白名单，如果 url 匹配 则忽略 token 验证
    if (options.ignore.includes(ctx.url)) {
      await next()
      return
    }
    // 不存在 token
    if (!ctx.headers.token) {
      ctx.helper.result(false, '请登录获取授权')
      ctx.status = 401
      return
    }
    try {
      // decode token
      const decoded: any = verify(ctx.headers.token, options.secretKey)
      // 将解密后的 uid 挂载到 ctx 上面
      ctx._uid = decoded._uid
      await next()
    } catch (e) {
      // 验证失败
      ctx.logger.error(`${e.name}: ${e.message} - ${e.expiredAt}`)
      ctx.helper.result(false, '无效的 token')
      ctx.status = 401
    }
  }
}
