import {Injectable} from '@angular/core';
import {IComment} from '../data/Comment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {PaginatedList} from '../data/PaginatedList';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = 'http://localhost:5052/';

  constructor(private http: HttpClient) {}

  getComments(pageIndex: number = 1, pageSize: number=25): Observable<PaginatedList<IComment>> {
    const params = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString()
    };

    return this.http.get<PaginatedList<IComment>>(this.baseUrl + 'comments', {params})
  }

  createComment(username: string, email: string, captcha: string, text: string, homepage: string = '', file: File | undefined): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('captcha', captcha);
    formData.append('text', text);
    formData.append('homepage', homepage);
    if(file){
      formData.append('file', file, file.name);
    }

    return this.http.post(this.baseUrl + 'comments', formData, {});
  }

}
