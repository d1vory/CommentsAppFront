import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    MatButton,
    FormsModule
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent {
  content: string = '';

  wrapText(tag: string): void {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const wrappedText = `<${tag}>${selectedText}</${tag}>`;

    // Create a temporary element to apply the wrapping
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = wrappedText;
    const wrappedNode = tempDiv.childNodes[0];

    // Replace the selected text with the wrapped node
    range.deleteContents();
    range.insertNode(wrappedNode);

    // Move the cursor after the inserted node
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(wrappedNode);
    selection.addRange(newRange);
  }
}
