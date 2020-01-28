
// {app_root}/app/controller/user.js
// exports.index = function* (ctx) {
//   ctx.body = yield ctx.model.User.find({});
// }
import { Controller } from 'egg'

export default class UserController extends Controller {
  public async signIn () {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const result = await ctx.service.user.login(username, password)
    ctx.body = {
      success: result
    }
  }

  public async signUp () {
    // const { ctx } = this
  }
}
