import { Controller } from 'egg'

export default class FriendController extends Controller {
  /**
   * 发起添加好友请求
   *
   * @memberof FriendController
   */
  public async addRequest () {
    this.ctx.helper.result(true, '添加好友')
  }

  /**
   * 处理添加好友请求
   *
   * @memberof FriendController
   */
  public async addResponse () {
    this.ctx.helper.result(true, '')
  }
}
