import {Component, forwardRef} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import {LinkDialogComponent} from './link-dialog/link-dialog.component';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    MatButton,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true
    }
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent implements ControlValueAccessor {
  content: string = '';

  constructor(private dialog: MatDialog) {}

  onChange = (content: string) => {};
  onTouched = () => {};

  wrapText(tag: string): void {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const wrappedText = `<${tag}>${selectedText}</${tag}>`;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = wrappedText;
    const wrappedNode = tempDiv.childNodes[0];

    range.deleteContents();
    range.insertNode(wrappedNode);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(wrappedNode);
    selection.addRange(newRange);

    this.content = document.getElementById('content-editable')?.innerHTML || '';
    this.onChange(this.content);
  }


  onInput(event: any): void {
    const html = event.target.innerHTML;
    this.onChange(html);
  }

  wrapTextWithLink(): void {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const selectedText = selection.toString();
    if (!selectedText) return;

    const dialogRef = this.dialog.open(LinkDialogComponent, {
      width: '250px',
      data: {linkUrl: ''}
    });

    dialogRef.afterClosed().subscribe((result: string | null) => {
      if (result) {
        const range = selection.getRangeAt(0);
        const wrappedText = `<a href="${result}" target="_blank">${selectedText}</a>`;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = wrappedText;
        const wrappedNode = tempDiv.childNodes[0];

        range.deleteContents();
        range.insertNode(wrappedNode);

        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(wrappedNode);
        selection.addRange(newRange);

        this.content = document.getElementById('content-editable')?.innerHTML || '';
        this.onChange(this.content);
      }
    });
  }

  writeValue(value: string): void {
    this.content = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
