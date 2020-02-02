module.exports = {
  watchDirs: {
    model: {
      directory: 'app/model', // 监听目录
      // pattern: '**/*.(ts|js)', // 遍历的文件表达式，一般都不需要改这个
      // ignore: '', // 指定忽略某些文件的表达式，默认为空
      generator: 'function', // 生成器名称，取值为 class、auto、function、object
      interface: 'IModel', // interface 名称，如果不填的话，将会随机生成个 interface
      declareTo: 'Application.model', // 指定定义到 egg 的某个类型下
      watch: true, // 是否需要监听文件改动
      caseStyle: 'upper' // 模块命名格式
      // interfaceHandle: val => `ReturnType<typeof ${val}>`, // interface 预处理方法
      // trigger: ['add', 'unlink'], // 当接收到这些文件更改事件的时候，会触发 d.ts 的重新生成, 所有事件: ['add', 'unlink', 'change']
    }
  }
}
