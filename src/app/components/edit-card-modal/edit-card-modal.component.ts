import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-edit-card-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.css']
})
export class EditCardModalComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card, isNew?: boolean }
  ) {
    this.editForm = this.fb.group({
      title: [data.card.title, [Validators.required, Validators.minLength(1)]],
      description: [data.card.description, [Validators.required, Validators.minLength(1)]]
    });

    if (!data.isNew) {
      this.editForm.get('title')?.disable();
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedCard: Card = {
        ...this.data.card,
        title: this.editForm.get('title')?.value,
        description: this.editForm.get('description')?.value
      };
      this.dialogRef.close(updatedCard);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
