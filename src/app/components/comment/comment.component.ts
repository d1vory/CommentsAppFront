import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {IComment} from '../../data/Comment';
import {DatePipe, NgIf} from '@angular/common';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';


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
    NgIf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: IComment;


  constructor() {

  }

  _returnHtmlFromRichText(richText: Document | null | undefined) {
    if (richText === undefined || richText === null || richText.nodeType !== 'document') {
      return '<p>Error</p>';
    }
    return documentToHtmlString(richText);
  }


}
