import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-link-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatInput,
    MatLabel
  ],
  templateUrl: './link-dialog.component.html',
  styleUrl: './link-dialog.component.css'
})
export class LinkDialogComponent {
  linkUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<LinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onApply(): void {
    this.dialogRef.close(this.linkUrl);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
