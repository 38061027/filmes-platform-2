import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatButtonModule,
  MatMenuModule,
  MatDatepickerModule,
  MatCardModule,
  MatNativeDateModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MODULES],
  exports: [MODULES],
})
export class MaterialModule {}
