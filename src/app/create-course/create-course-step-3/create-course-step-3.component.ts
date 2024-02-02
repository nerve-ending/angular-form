import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'create-course-step-3',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './create-course-step-3.component.html',
  styleUrls: ['./create-course-step-3.component.scss'],
})
export class CreateCourseStep3Component {
  form = this.fb.group({});

  constructor(private fb: FormBuilder) {}
}
