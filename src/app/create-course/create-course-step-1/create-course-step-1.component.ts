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
import { Observable, filter } from 'rxjs';

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

    const draft = localStorage.getItem('STEP_1');

    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }

    this.form.valueChanges
      .pipe(
        //this.form.valueChanges 返回的是一个 Observable，表示一个可以被订阅的数据流。
        filter(() => this.form.valid)
      )
      .subscribe((val) => {
        // 如果只需要进行简单的条件判断，例如只在某个条件下执行一个语句块，使用 if 语句可能更为适合。
        // 如果需要在数据流中进行一系列的处理，或者需要将多个操作符组合起来，使用 filter 操作符更有优势。
        // if (this.form.valid) {  //这种方式也是可以的
        //   localStorage.setItem('STEP_1', JSON.stringify(val))
        // }
        return localStorage.setItem('STEP_1', JSON.stringify(val));
      });
  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}
