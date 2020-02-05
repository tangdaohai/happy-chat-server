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
}
