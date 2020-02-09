// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFriend from '../../../app/service/Friend';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    friend: ExportFriend;
    user: ExportUser;
  }
}
