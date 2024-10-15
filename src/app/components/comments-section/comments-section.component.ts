import {Component, inject} from '@angular/core';
import {CommentComponent} from '../comment/comment.component';
import {IComment} from '../../data/Comment';
import {CommentsService} from '../../services/commentService';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommentComponent, NgForOf],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent {
  commentsList: IComment[] = [];
  commentsService: CommentsService = inject(CommentsService);

  constructor() {
    this.commentsService.getAllComments().then((commentsList: IComment[]) => {
      this.commentsList = commentsList;
    })


  }

}
