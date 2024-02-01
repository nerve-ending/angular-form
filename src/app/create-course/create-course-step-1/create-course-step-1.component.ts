import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { courseTitleValidator } from '../../validators/course-title.validator';
import { CoursesService } from '../../validators/courses.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'create-course-step-1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [CoursesService], //解决了ERROR NullInjectorError问题
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.courses)], //异步验证器
        updateOn: 'blur',
      },
    ],
    releasedAt: [new Date(), [Validators.required]],
  });

  constructor(private fb: FormBuilder, private courses: CoursesService) {}
  ngOnInit(): void {}

  get courseTitle() {
    return this.form.controls['title'];
  }
}
