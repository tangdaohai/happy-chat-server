export default app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const FriendDetail = new Schema({
    uid: { type: String, required: true }, // 好友 ID
    isFriend: Boolean, // 是否被对方拉黑
    note: String, // 备注
    star: Boolean, // 星标好友
    tags: [String] // 标签
  })

  const FriendSchema = new Schema({
    uid: { type: String, required: true },
    friendList: [FriendDetail]
  })

  return mongoose.model('friend', FriendSchema)
}
