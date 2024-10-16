import {Component, inject, OnInit} from '@angular/core';
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

export class CommentsSectionComponent implements OnInit{
  commentsList: IComment[] = [];
  commentsService: CommentsService = inject(CommentsService);

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentsService.getComments().subscribe(
      (data: IComment[]) => {
        this.commentsList = data;
        console.log(this.commentsList);
      },
      error => {
        console.error('Error fetching comments', error);
      }
    );
  }

  // constructor() {
  //   this.commentsService.getAllComments().then((commentsList: IComment[]) => {
  //     this.commentsList = commentsList;
  //   })
  //
  //
  // }

}
