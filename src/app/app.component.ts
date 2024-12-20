import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommentsSectionComponent} from './components/comments-section/comments-section.component';
import { HttpClient } from '@angular/common/http';
import {CommentsService} from './services/commentService';
import {BrowserModule} from '@angular/platform-browser';
import {SimplealertModule} from 'simplealert';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill'
import {NotificationComponent} from './components/notification/notification.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentsSectionComponent, SimplealertModule, QuillModule, NotificationComponent],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CommentsApp';
}
