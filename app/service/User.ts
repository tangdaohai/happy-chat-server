import { Service } from 'egg'
export default class User extends Service {
  public async signIn (username: string, password: string) {
    const result = await this.app.model.User.findOne({ username, password })
    return result
  }

  public async signUp (username: string, password: string, passwordConfirm: string) {
    const userModel = this.app.model.User
    // 先查询是否存在
    const existed = await userModel.findOne({ username })
    if (existed) {
      throw new Error('账号已存在')
    }
    const now = Date.now()
    const result = await userModel.create({
      username,
      password,
      passwordConfirm,
      createTime: now,
      updateTime: now
    })
    if (!result) {
      this.app.logger.error(result)
      throw new Error('注册失败')
    }
    return !!result
  }

  /** */
  public async changePass (uid: string, oldPass: string, newPass: string) {
    const userModel = this.app.model.User
    let user
    try {
      user = await userModel.findOneAndUpdate({
        _id: uid,
        password: oldPass
      }, {
        password: newPass
      })
    } catch (err) {
      // mongo 逻辑问题 catch
      this.app.logger.error(`${uid} - oldPass: ${oldPass} : ${err.message}`)
      throw new Error('修改失败，请稍后再试')
    }

    if (!user) {
      // 如果是 null 说明 old pass 错误
      throw new Error('输入的旧密码错误')
    }
  }

  /**
   * 获取用户详情
   * @FIXME 查询逻辑需要思考一下是否放到这里
   * @param {string} uid 用户自己的 id
   * @param {string} friendId 朋友的 id
   * @return {UserDetail} 返回用户详情，如果传递了 friendId 会包含 备注与标签属性
   * @memberof User
   */
  public async detail (uid: string, friendId?: string) {
    const userDocument = await this.app.model.User.findById(uid)
    let result
    if (userDocument) {
      const { name, sex, identityNumber, avatar, area } = userDocument
      result = { name, sex, identityNumber, avatar, area }
    }

    if (friendId && result) {
      const friendDocument = await this.app.model.Friend.findOne({ uid, friendId })
      // 如果有备注显示，否则显示此人的昵称
      result.note = friendDocument?.note || result.name
      result.tags = friendDocument?.tags || []
    }

    return result as UserDetail
  }
}

interface UserDetail {
  name: string;
  identity: string;
  sex: number;
  avatar: string;
  area: string;
  note: string;
  tags: Array<string>;
}
