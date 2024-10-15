import {User} from './User';

export interface Comment {
  id: number;
  text: string;
  createdAt: Date;
  file: string;
  user: User;
}
