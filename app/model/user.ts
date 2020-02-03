import { Application } from 'egg'
import { Document } from 'mongoose'
export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema<UserModel>({
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

  return mongoose.model<UserDocument>('user', UserSchema)
}

interface UserModel {
  username: string;
  password: string;
  email: string;
  identity: string;
  sex: number;
  avatar: string;
  area: string;
  createTime: Date;
  updateTime: Date;
}

type Raw = UserModel & Document

interface UserDocument extends Raw {}
