import { Component } from '@angular/core';
import {CommentComponent} from '../comment/comment.component';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommentComponent],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent {

}
