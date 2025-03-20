import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

  ],

  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) {
    // Inicializa o formulário com os dados do usuario
    this.editForm = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, Validators.required],
      phone: [data.user.phone, Validators.required],
      address: [data.user.address, Validators.required],
      username: [data.user.username, Validators.required],

    });
  }


  onSave(): void {
    this.dialogRef.close(this.editForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}



