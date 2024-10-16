import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommentsSectionComponent} from './components/comments-section/comments-section.component';
import { HttpClient } from '@angular/common/http';
import {CommentsService} from './services/commentService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentsSectionComponent],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CommentsApp';
}
