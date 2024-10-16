import {Injectable} from '@angular/core';
import {IComment} from '../data/Comment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = 'http://localhost:5052/';

  constructor(private http: HttpClient) {}

  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.baseUrl + 'comments').pipe(
      map(comments => comments.map(comment => ({
        ...comment,
        file: comment.file ? this.baseUrl + comment.file : ''
      })))
    );
  }

}
