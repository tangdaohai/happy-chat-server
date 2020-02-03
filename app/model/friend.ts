import { Application } from 'egg'
import { Document } from 'mongoose'
export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const FriendDetail = new Schema<FriendModel>({
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

  return mongoose.model<FriendDocument>('friend', FriendSchema)
}

interface FriendModel {
  uid: string;
  friendList: [{
    uid: string;
    Document: boolean;
    note: string;
    star: boolean;
    tags: Array<string>;
  }];
}

type Raw = FriendModel & Document
interface FriendDocument extends Raw {}
