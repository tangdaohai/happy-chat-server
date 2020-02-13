import { Controller } from 'egg'

export default class FriendController extends Controller {
  /**
   * 获取好友列表
   *
   * @memberof FriendController
   */
  public async list () {
    const { ctx } = this
    const result = ctx.service.friend.list(ctx._uid)
    ctx.helper.success(result)
  }

  /**
   * 搜索
   *
   * @memberof FriendController
   */
  public async search () {
    const { ctx } = this
    const { key, sex } = ctx.request.body
    ctx.validate({
      key: 'string'
    })
    const result = await ctx.service.friend.search(key, sex)
    ctx.helper.success(result)
  }

  /**
   * 发起添加好友请求
   *
   * @memberof FriendController
   */
  public async addRequest () {
    const { ctx } = this
    const uid = ctx._uid
    const { friendId, source, reqMsg } = ctx.request.body
    // 1. 存储添加请求的数据
    const history = await ctx.service.friend.saveAddRequest(friendId, uid, source, reqMsg)
    console.log(history)
    // 2. socket 推送请求
    // 2.1 判断当前是否在线 如果不在线 储存，等上线后 再推送
    // 2.2 如果在线 直接推送
    this.ctx.helper.success('发起添加好友请求')
  }

  /**
   * 处理添加好友请求
   *
   * @memberof FriendController
   */
  public async addResponse () {
    this.ctx.helper.success('响应添加好友的请求')
  }

  /**
   * 拉黑删除
   *
   * @memberof FriendController
   */
  public async del () {
    this.ctx.helper.success('拉黑删除')
  }

  /**
   * 修改备注
   *
   * @memberof FriendController
   */
  public async note () {
    this.ctx.helper.success('修改备注')
  }

  /**
   * 标签处理
   *
   * @memberof FriendController
   */
  public async tags () {
    this.ctx.helper.success('标签处理')
  }

  /**
   * 设置星标
   *
   * @memberof FriendController
   */
  public async star () {
    this.ctx.helper.success('设置星标')
  }
}
