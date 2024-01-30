import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FileUploadComponent,
    HttpClientModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-demo';
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        courseType: ['premium', Validators.required],
        price: [
          null,
          [
            Validators.required,
            Validators.min(1),
            Validators.max(9999),
            Validators.pattern('[0-9]+'),
          ],
        ],
        thumbnail: [null],
        promoStartAt: ['', Validators.required],
        promoEndAt: ['', Validators.required],
      },
      {
        validators: this.promoPeriodValidator,
      }
    );
  }

  promoPeriodValidator(formGroup: FormGroup) {
    const promoStartAt = formGroup.get('promoStartAt')?.value;
    const promoEndAt = formGroup.get('promoEndAt')?.value;

    if (promoStartAt && promoEndAt && promoStartAt > promoEndAt) {
      return { promoPeriod: true };
    }

    return null;
  }

  onSubmit() {
    console.log('form', this.form.value);
    if (this.form.valid) {
      // 处理表单提交逻辑
    }
  }
}
