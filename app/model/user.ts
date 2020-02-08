import { Application } from 'egg'
import { Document } from 'mongoose'
export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema<UserModel>({
    // 账户
    username: { type: String, required: true },
    password: { type: String, required: true },
    // 个人昵称
    name: String,
    email: String,
    // 系统生成的id，改动一次后不可再次修改（类似微信号，用于搜索）
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
  name: string;
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
