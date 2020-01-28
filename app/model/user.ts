export default app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    id: { type: String },
    username: { type: String },
    password: { type: String }
  })

  return mongoose.model('user', UserSchema)
}
