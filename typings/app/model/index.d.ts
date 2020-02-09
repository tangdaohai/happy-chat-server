// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddFriendHistory from '../../../app/model/add-friend-history';
import ExportFriend from '../../../app/model/friend';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface Application {
    model: IModel;
  }

  interface IModel {
    AddFriendHistory: ReturnType<typeof ExportAddFriendHistory>;
    Friend: ReturnType<typeof ExportFriend>;
    User: ReturnType<typeof ExportUser>;
  }
}
