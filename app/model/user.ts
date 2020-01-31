export default app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    identity: String,
    sex: Number,
    avatar: String,
    area: String,
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: true }
  })

  return mongoose.model('user', UserSchema)
}
