import {Injectable, OutputEmitterRef} from '@angular/core';
import {IComment} from '../data/Comment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginatedList} from '../data/PaginatedList';
import {Replies} from '../data/Replies';
import {NotificationService} from './notificationService';
import {NotificationType} from '../data/Notification';
import {MyError} from '../data/Error';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = 'http://localhost:5052/';

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  }

  getComments(pageIndex: number = 1, pageSize: number = 25): Observable<PaginatedList<IComment>> {
    const params = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString()
    };

    return this.http.get<PaginatedList<IComment>>(this.baseUrl + 'comments', {params})
  }

  getReplies(commentId: number): Observable<IComment[]> {
    const url = `${this.baseUrl}comments/${commentId}/replies`;
    return this.http.get<IComment[]>(url)
  }

  createComment(
    username: string, email: string, captcha: string, text: string, homepage: string = '', file: File | undefined, commentId: number | undefined, parentComment: OutputEmitterRef<IComment>,
  ): Observable<IComment> {
    let url: string
    if (commentId) {
      url = `${this.baseUrl}comments/${commentId}/reply/`
    } else {
      url = `${this.baseUrl}comments`
    }

    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('captcha', captcha);
    formData.append('text', text);
    formData.append('homepage', homepage);
    if (file) {
      formData.append('file', file, file.name);
    }

    const response = this.http.post<IComment>(url, formData, {})
    response.subscribe({
      next: (data: IComment) => {
        this.notificationService.notify({
          title: '',
          type: NotificationType.success,
          message: "Comment created!",
        });
        parentComment.emit(data)
        return data

      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        const kek: MyError = error.error;
        this.notificationService.notify({
          title: '',
          type: NotificationType.error,
          message: kek.message,
        });
      }
    })
    return response

  }

  addReplyToComment(comment: IComment, reply: IComment): void {
    if(comment.replies === undefined || comment.replies === null) {
      comment.replies = [];
    }
    comment.replies.unshift(reply);
  }

}
