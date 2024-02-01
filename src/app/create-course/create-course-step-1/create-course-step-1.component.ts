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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

interface CourseCategory {
  code: string;
  description: string;
}

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
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [CoursesService], //解决了ERROR NullInjectorError问题
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component implements OnInit {
  courseCategories$: Observable<CourseCategory[]> = new Observable<
    CourseCategory[]
  >();

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
    category: ['BEGINNER', [Validators.required]],
    downloadsAllowed: [false, [Validators.requiredTrue]],
    longDescription: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private courses: CoursesService) {}
  ngOnInit(): void {
    this.courseCategories$ = this.courses.findCourseCategories();
  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}
