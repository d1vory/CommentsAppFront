import {Injectable} from '@angular/core';
import {IComment} from '../data/Comment';
import {HttpClient, HttpResponse} from '@angular/common/http';
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

  createComment(username: string, email: string, captcha: string, text: string, homepage: string = '', file: File | undefined): void {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('captcha', captcha);
    formData.append('text', text);
    formData.append('homepage', homepage);
    if(file){
      formData.append('file', file, file.name);
    }

    this.http.post(this.baseUrl + 'comments', formData, {}).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error: HttpResponse<any>) => {
        console.error('Error creating comment', error);
      }
    })


  }

}
