import { Controller } from 'egg'
import { sign } from 'jsonwebtoken'

export default class UserController extends Controller {
  /**
   * 登录
   *
   * @memberof UserController
   */
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
      ctx.helper.success({ token })
    } else {
      ctx.helper.error('登录失败')
    }
  }

  /**
   * 注册
   * @memberof UserController
   */
  public async signUp () {
    const { ctx } = this
    const { username, password } = ctx.request.body
    ctx.validate({
      username: 'string',
      password: {
        type: 'string',
        min: 6
      },
      // 验证 ctx.request.body 中的 passwordConfirm 是否与 password 一致
      passwordConfirm: {
        type: 'password',
        compare: 'password',
        min: 6
      }
    })
    try {
      // 没有异常抛出 认为是注册成功了
      await ctx.service.user.signUp(username, password)
      ctx.helper.success('注册成功')
    } catch (err) {
      ctx.helper.error(err.message)
    }
  }

  /**
   * 修改密码
   *
   * @memberof UserController
   */
  public async changePass () {
    const { ctx } = this
    const { oldPassword, newPassword } = ctx.request.body
    ctx.validate({
      oldPassword: {
        type: 'string',
        min: 6
      },
      newPassword: {
        type: 'string',
        min: 6
      },
      // 验证 ctx.request.body 中的 newPasswordConfirm 是否与 newPassword 一致
      newPasswordConfirm: {
        type: 'password',
        compare: 'newPassword',
        min: 6
      }
    })
    try {
      await ctx.service.user.changePass(ctx._uid, oldPassword, newPassword)
      ctx.helper.success('修改成功')
    } catch (err) {
      console.log(err.message)
      ctx.helper.error(err.message)
    }
  }

  /**
   * 用户详情
   *
   * @memberof UserController
   */
  public async detail () {
    const { ctx } = this
    // 如果未传递 uid 则获取个人详情，否则查询对应 uid 的详情
    const result = ctx.service.user.detail(ctx._uid, ctx.request.body.friendId)
    if (result) {
      ctx.helper.success(result)
    } else {
      ctx.helper.error('获取失败')
    }
  }
}
