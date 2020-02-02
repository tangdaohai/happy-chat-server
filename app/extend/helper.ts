import { IHelper } from 'egg'
export default {
  result (this: IHelper, success: boolean, content?: any) {
    this.ctx.body = {
      success,
      content
    }
  }
}
