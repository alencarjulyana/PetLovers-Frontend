import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-pet-dialog',
  templateUrl: './edit-pet-dialog.component.html',
  styleUrls: ['./edit-pet-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, 
            ReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule]
})
export class EditPetDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pet: any }
  ) {
    // Inicializa o formulário com os dados do pet recebido
    this.editForm = this.fb.group({
      name: [data.pet.name, Validators.required],
      breed: [data.pet.breed, Validators.required],
      type: [data.pet.type, Validators.required],
      size: [data.pet.size, Validators.required],
      sex: [data.pet.sex, Validators.required],
      neutered: [data.pet.neutered, Validators.required],
      photo: [data.pet.photo, Validators.required]
    });
  }

  // Método para capturar o arquivo e converter para Base64
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Atualiza o controle "photo" com a string Base64
        this.editForm.patchValue({
          photo: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.editForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
