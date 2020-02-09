import { Application } from 'egg'
import { Document } from 'mongoose'
export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const AddFriendHistorySchema = new Schema({
    uid: { type: String, required: true },
    // 发起请求一方的 id
    friendId: { type: String, required: true },
    // 当时发起请求时的 name
    friendName: { type: String, required: true },
    // 发起的来源
    source: String,
    requestTime: Date,
    reponseTime: Date, // 备注名称
    // 处理结果，0 拒绝 1 接受 2 未响应（初始状态）
    result: { type: Number, default: 2 }
  })

  return mongoose.model<AddFriendHistoryDocument>('addFriendHistory', AddFriendHistorySchema)
}

interface AddFriendHistoryModel {
  uid: string;
  friendId: string;
  friendName: string;
  source: string;
  requestTime: Date;
  reponseTime: Date;
  result: number;
}

type Raw = AddFriendHistoryModel & Document
interface AddFriendHistoryDocument extends Raw {}
