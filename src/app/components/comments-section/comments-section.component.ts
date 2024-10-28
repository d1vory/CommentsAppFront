import {Component, inject, OnInit} from '@angular/core';
import {CommentComponent} from '../comment/comment.component';
import {IComment} from '../../data/Comment';
import {CommentsService} from '../../services/commentService';
import {NgForOf, NgIf} from '@angular/common';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {SimplealertModule} from 'simplealert';
import {NotificationComponent} from '../notification/notification.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PaginatedList} from '../../data/PaginatedList';
import {NotificationType} from '../../data/Notification';
import {HttpErrorResponse} from '@angular/common/http';
import {MyError} from '../../data/Error';
import {FormBuilder} from '@angular/forms';
import {NotificationService} from '../../services/notificationService';
import {MatCard} from '@angular/material/card';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommentComponent, NgForOf, CommentFormComponent, SimplealertModule, NotificationComponent, MatPaginator, MatCard, MatFabButton, MatIcon, NgIf, MatMenu, MatMenuItem, MatButton, MatMenuTrigger],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})

export class CommentsSectionComponent implements OnInit{
  createComment:boolean = false;
  commentsList: IComment[] = [];
  commentsService: CommentsService = inject(CommentsService);
  totalComments: number = 0;
  pageSize: number = 25;
  pageIndex: number = 1;
  totalPages: number = 0;
  orderByPlaceHolder: string = "CreatedAt↓";

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.fetchComments(this.pageIndex, this.pageSize);
  }

  fetchComments(pageIndex: number = 1, pageSize: number=25, orderBy: string | null = null): void {
    const response = this.commentsService.getComments(pageIndex, pageSize, orderBy);
    response.subscribe({
      next: (response) => {
        console.log(response);
        this.commentsList = response.items.map(comment => ({
          ...comment,
          file: comment.file ? this.commentsService.baseUrl + comment.file : ''
        }))
        this.totalComments = response.totalItems;
        this.pageIndex = response.pageIndex;
        this.totalPages = response.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        const kek: MyError = error.error;
        this.notificationService.notify({
          title: '',
          type: NotificationType.error,
          message: kek.message,
        });
      }
    })

  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchComments(this.pageIndex, this.pageSize);
  }

  toggleCreateCommentForm(): void {
    this.createComment = !this.createComment;
  }

  addNewCommentToList($event: IComment) {
    this.commentsList.unshift($event);
  }

  sortComments(orderBy:string, orderByPlaceHolder: string) {
    this.orderByPlaceHolder = orderByPlaceHolder;
    this.fetchComments(this.pageIndex, this.pageSize, orderBy);
  }
}
