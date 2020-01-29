import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 设置前缀
  const v1 = router.prefix('/api/v1')

  v1.post('/user/login', controller.user.signIn)
}
