import { Service } from 'egg'
export default class User extends Service {
  public async login (username: string, password: string) {
    const { app } = this
    const result = await app.model.User.findOne({ username, password })
    return !!result
  }
}
