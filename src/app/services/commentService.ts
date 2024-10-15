import {Injectable} from '@angular/core';
import {IComment} from '../data/Comment';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = 'http://localhost:5052';

  constructor() { }

  async getAllComments(): Promise<IComment[]> {
    const data =await fetch(this.baseUrl + '/comments');
    return (await data.json()) ?? [];
  }
}
