import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 设置前缀
  const v1 = router.prefix('/api/v1')

  v1.post('/user/sign-in', controller.user.signIn)
  v1.post('/user/sign-up', controller.user.signUp)
  v1.post('/user/change-password', controller.user.changePass)

  v1.post('/friend/add/request', controller.friend.addRequest)
  v1.post('/friend/add/response', controller.friend.addResponse)
}
