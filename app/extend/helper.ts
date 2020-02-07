import { IHelper } from 'egg'
export default {
  /**
   * 设置返回的 ctx.body
   */
  result (this: IHelper, success: boolean, content?: any) {
    this.ctx.body = {
      success,
      content
    }
  },

  /**
   * 设置返回 成功 的 ctx.body
   */
  success (this: IHelper, content?: any) {
    this.result(true, content)
  },
  /**
   * 设置返回 失败 的 ctx.body
   */
  error (this: IHelper, content?: any) {
    this.result(false, content)
  }
}
