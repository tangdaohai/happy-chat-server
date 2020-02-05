import { Controller } from 'egg'
import { sign } from 'jsonwebtoken'

export default class UserController extends Controller {
  public async signIn () {
    const { ctx, app } = this
    const { username, password } = ctx.request.body
    // 参数验证，如果验证不通过 会 throw error 由 egg 来处理（返回的状态码为 422）
    ctx.validate({
      username: 'string',
      password: {
        type: 'string',
        min: 6
      }
    })
    // 上面验证没有通过，抛出异常后 不会走到这里
    const result = await ctx.service.user.signIn(username, password)
    if (result) {
      // 签发认证 token
      const token = sign({ _uid: result._id }, app.config.jwt.secretKey, {
        expiresIn: app.config.jwt.expiresIn
      })
      ctx.helper.result(true, { token })
    } else {
      ctx.helper.result(false, '登录失败')
    }
  }

  /**
   *
   *
   * @memberof UserController
   */
  public async signUp () {
    const { ctx } = this
    const { username, password, passwordConfirm } = ctx.request.body
    ctx.validate({
      username: 'string',
      password: {
        type: 'string',
        min: 6
      },
      passwordConfirm: {
        type: 'password',
        compare: 'password',
        min: 6
      }
    })
    try {
      const result = await ctx.service.user.signUp(username, password, passwordConfirm)
      ctx.helper.result(result, '注册成功')
    } catch (err) {
      console.log(err.message)
      ctx.helper.result(false, err.message)
    }
  }
}
