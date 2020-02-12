import { Service } from 'egg'

export default class FriendService extends Service {
  /**
   * 获取好友列表
   *
   * @param {string} uid
   * @memberof FriendService
   */
  public async list (uid: string) {
    const result = await this.app.model.Friend.find({ uid })
    return result
  }

  /**
   * 待优化模糊搜索 @TODO
   * 根据字符串查询 name 与 标识号码，
   * @param {string} key 查询关键字
   * @param {number} [sex] 性别 0 男，1 女
   * @memberof FriendService
   */
  public async search (key: string, sex?: number) {
    const regexp = new RegExp(key)
    const result = await this.app.model.User.find({
      name: regexp,
      identityNumber: regexp,
      sex
    })
    // @TODO result 排序等相关逻辑
    return result
  }

  /**
   * 储存添加好友的请求信息
   *
   * @param {string} uid 发起者 id
   * @param {string} friendId 被添加的 id
   * @param {string} source 来源（群、搜索id 号）
   * @param {string} reqMsg 请求添加的消息
   * @return {object} 添加记录
   * @memberof FriendService
   */
  public async saveAddRequest (uid: string, friendId: string, source: string, reqMsg: string) {
    const model = this.app.model
    // 查询当前 uid 对应的 name
    const User = await model.User.findById(uid)
    // 如果 name 不存在 使用 uid 代替
    const name = User?.name || uid
    // 请求时间
    const now = new Date()
    // 整理请求记录 并返回调用者
    const hsitory = {
      uid,
      friendId,
      friendName: name,
      source,
      msg: [{
        from: '',
        msg: reqMsg
      }],
      requestTime: now
    }
    // 储存
    await model.AddFriendHistory.create(hsitory)
    return hsitory
  }
}
