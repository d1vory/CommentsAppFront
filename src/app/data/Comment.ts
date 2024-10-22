import {IUser} from './User';

export interface IComment {
  id: number;
  text: string;
  createdAt: Date;
  file: string;
  user: IUser;
  replies?: IComment[];
  parentCommentId?: number;
}
