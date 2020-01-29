export default {
  result (status: boolean, content?: object) {
    return {
      status,
      content
    }
  }
}
