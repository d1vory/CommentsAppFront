import {Component, inject, Input, OnInit, output} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatError, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FileValidator, MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIcon} from '@angular/material/icon';
import {CommentsService} from '../../services/commentService';
import {SimplealertModule} from 'simplealert';
import {NotificationService} from '../../services/notificationService';
import {NotificationType} from '../../data/Notification';
import {MyError} from '../../data/Error';
import {ContentChange, QuillEditorComponent, QuillModule} from 'ngx-quill';
import {IComment} from '../../data/Comment';
import {outputFromObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    CommonModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatButton,
    MatLabel,
    MatError,
    MaterialFileInputModule,
    MatIconButton,
    MatIcon,
    SimplealertModule,
    QuillModule
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {
  @Input() replyCommentId?: number;
  createdComment = output<IComment>()

  readonly maxSize = 104857600; //10mb
  commentsService: CommentsService = inject(CommentsService);

  commentForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    homepage: new FormControl('', []),
    captcha: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    file: new FormControl(null, [FileValidator.maxContentSize(this.maxSize)]),

  })
  uploadedFile: File | undefined;

  constructor(private fb:FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

    onFileSelected(event: any): void {
      const files = event.target.files;
      if (files.length > 0) {
      for (let file of files) {
        if (this.isValidFileType(file)) {
          this.uploadedFile = file;
          break;
        }
      }
    }
  }

    isValidFileType(file: File): boolean {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'text/plain'];
      return allowedTypes.includes(file.type);
    }

    onSubmit(): void {
      if (this.commentForm?.valid) {

        this.commentsService.createComment(
          <string>this.commentForm.value.username,
          <string>this.commentForm.value.email,
          <string>this.commentForm.value.captcha,
          this.cleanCommentText(<string>this.commentForm.value.text),
          <string>this.commentForm.value.homepage || '',
          this.uploadedFile || undefined,
          this.replyCommentId
        ).subscribe({
          next: (data: IComment) => {
            this.createdComment.emit(data);
          }
        })



    }
  }

  cleanCommentText(text: string): string {
    return  text.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<em>", "<i>").replaceAll("</em>", "</i>");
  }

}
