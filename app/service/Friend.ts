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
}
