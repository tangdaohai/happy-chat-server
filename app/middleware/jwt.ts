import { Context, EggAppConfig } from 'egg'
import { verify } from 'jsonwebtoken'

export default (options: EggAppConfig['jwt']): any => {
  return async function (ctx: Context, next) {
    if (options.ignore.includes(ctx.url)) {
      await next()
      return
    }
    if (!ctx.headers.token) {
      ctx.helper.result(false, '请登录获取授权')
      ctx.status = 403
      return
    }
    try {
      const decoded: any = verify(ctx.headers.token, options.secretKey)
      ctx._uid = decoded._uid
      await next()
    } catch (e) {
      ctx.logger.error(e)
      ctx.status = 403
    }
  }
}
