import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {IComment} from '../../data/Comment';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {CommentsService} from '../../services/commentService';
import {NotificationService} from '../../services/notificationService';
import {Replies} from '../../data/Replies';
import {HttpErrorResponse} from '@angular/common/http';
import {MyError} from '../../data/Error';
import {NotificationType} from '../../data/Notification';
import {CommentFormComponent} from '../comment-form/comment-form.component';


@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    DatePipe,
    NgIf,
    NgForOf,
    CommentFormComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: IComment;
  viewReplyForm:boolean = false;


  constructor(private commentService: CommentsService, private notificationService: NotificationService) {

  }

  fetchReplies() {
    const response = this.commentService.getReplies(this.comment.id);
    response.subscribe({
        next: (data) => {
          this.comment.replies = data;
        },
        error: (error: HttpErrorResponse) => {
          const err: MyError = error.error;
          this.notificationService.notify({
            title: '',
            type: NotificationType.error,
            message: err.message,
          });
        }

    })
  }

  toggleReplyForm(){
    this.viewReplyForm = !this.viewReplyForm;
  }

  addNewCommentToList($createdComment: IComment) {
    if(!$createdComment) return;
    if($createdComment.parentCommentId == this.comment.id){
      this.commentService.addReplyToComment(this.comment, $createdComment)
    }
  }

}
