import { Application } from 'egg'
import { Document } from 'mongoose'
export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const FriendSchema = new Schema({
    uid: { type: String, required: true },
    friendId: { type: String, required: true },
    isBeBlack: { type: Boolean, default: true }, // 是否被对方拉黑，默认不是好友
    note: String, // 备注名称
    star: { type: Boolean, default: false }, // 星标好友，默认不是星标好友
    tags: { type: [String], default: [] } // 标签
  })

  return mongoose.model<FriendDocument>('friend', FriendSchema)
}

interface FriendModel {
  uid: string;
  friendId: string;
  isBeBlack: boolean;
  note: string;
  star: boolean;
  tags: Array<string>;
}

type Raw = FriendModel & Document
interface FriendDocument extends Raw {}
